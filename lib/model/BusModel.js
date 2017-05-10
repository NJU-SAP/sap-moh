import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';
import buslinesRawData from './../../data/gis/bus-lines.json';

function getBuslinesGeoData() {
  // [ { hor, ver }, {...}, ...]
  return _.split(buslinesRawData[0], ',')
      .map(pointStr => _.split(pointStr, ' '))
      .map(splitStr => ({ hor: parseFloat(splitStr[0]), ver: parseFloat(splitStr[1]) }));
}

function interpolateBusLine(buslineData, pointCount) {
  const path = Smooth(buslineData, {
    method: Smooth.METHOD_CUBIC,
    clip: Smooth.CLIP_PERIODIC,
    cubicTension: Smooth.CUBIC_TENSION_CATMULL_ROM
  }, { scaleTo: pointCount - 1 });
  return path;
}

class BusLineFlowModel {
  constructor(config) {
    this._pathSmoothFucntion = null;
    // this._pathSmoothGeoData = [];
    this._busTotalCount = config.busCount;
    this._pathPointTotalCount = config.pointCount || 500;
    this._sectionPathStatus = _.fill(Array(this._pathPointTotalCount), 0);
    this._init();
  }

  _init() {
    const buslineGeoData = getBuslinesGeoData().map(v => [v.hor, v.ver]);
    this._pathSmoothFucntion =
        interpolateBusLine(buslineGeoData, this._pathPointTotalCount);
    this._dispatchBuses();
  }

  dispatchBuses() {
    let n = this._busTotalCount;
    const maxCount = n + 1;
    const sectionPathStatus = this._sectionPathStatus;
    while (n > 0) {
      sectionPathStatus[math.random(0, math.randomInt(0, maxCount))] += 1;
      n -= 1;
    }
  }

  getAllBusLinePathSectionPoints() {
    const path = this._pathSmoothFucntion;
    return Array(this._pathPointTotalCount)
    .map((v, i) => path(i))
    .map(v => ({ hor: v[0], ver: v[1] }));
  }

  refresh() {

  }
}

export default BusLineFlowModel;
