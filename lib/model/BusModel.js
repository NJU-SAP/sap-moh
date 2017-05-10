import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';
import buslinesRawData from './../../data/gis/bus-lines.json';
import indexModelFactory from './IndexModel';

const d3 = require('d3-random');

function getBuslinesGeoData() {
  // [ { hor, ver }, {...}, ...]
  return _.split(buslinesRawData[0], ',')
      .map(pointStr => _.split(pointStr, ' '))
      .map(splitStr => ({ hor: parseFloat(splitStr[0]), ver: parseFloat(splitStr[1]) }));
}

function interpolateBusLine(buslineData) {
  const path = Smooth(buslineData, {
    method: Smooth.METHOD_CUBIC,
    clip: Smooth.CLIP_PERIODIC,
    cubicTension: Smooth.CUBIC_TENSION_CATMULL_ROM
  }, { scaleTo: 1 });
  return path;
}

export default class BusLineFlowModel {
  constructor(config) {
    this._pathSmoothFucntion = null;
    // this._pathSmoothGeoData = [];
    this._busTotalCount = config.busCount;
    this._busData = { };
    this._init();
  }

  _init() {
    const buslineGeoData = getBuslinesGeoData().map(v => [v.hor, v.ver]);
    this._pathSmoothFucntion =
        interpolateBusLine(buslineGeoData);
    this._dispatchBuses();
  }

  _dispatchBuses() {
    let n = this._busTotalCount;
    // const maxCount = n + 1;
    const busList = this._busData;
    while (n > 0) {
      // coe: 0 ~ 1, conresponding to a path location in loop.
      const coefficient = math.random();
      busList[n] = {
        location: this._pathSmoothFucntion(coefficient),
        vacant: math.randomInt(10) > 7,
        coefficient
      };
      n -= 1;
    }
  }

  getAllBusInfo() {
    return _.mapValues(this._busData, bus => ({
      location: bus.location, vacant: bus.vacant }));
  }

  async refresh(time) {
    const busSpeedIndexModel = await indexModelFactory.getBusSpeedIndexModel();
    busSpeedIndexModel.getLatestIndexData(time);

    const currentSpeed = busSpeedIndexModel.getLatestIndexData(time);

    const forwardRandom = d3.randomNormal(currentSpeed / 1000, 1);
    const forward = (bus) => {
      let val = forwardRandom();
      val = math.max(0, math.min((currentSpeed / 1000) * 2, val));
      const coefficient =
          bus.coefficient + val > 1 ? val : bus.coefficient + val;
      bus.location = this._pathSmoothFucntion(coefficient);
      bus.coefficient = coefficient;
    };

    for (let key in this._busData) {
      const bus = this._busData[key];
      forward(bus);
    }
  }
}
