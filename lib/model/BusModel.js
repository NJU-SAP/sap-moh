import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';
import { rtIndexModelFactory } from './IndexModel';

// can only use require due to incorrect export in d3-random
const d3 = require('d3-random');

function getBuslinesGeoData(buslinesData) {
  // [ { hor, ver }, {...}, ...]
  return _.split(buslinesData, ',')
      .map(pointStr => _.split(pointStr, ' '))
      .map(splitStr => [
        parseFloat(splitStr[0]),
        parseFloat(splitStr[1])
      ]);
}

function interpolateBusLine(buslineData) {
  const path = Smooth(buslineData, {
    method: Smooth.METHOD_CUBIC,
    // clip: Smooth.CLIP_PERIODIC,
    // cubicTension: Smooth.CUBIC_TENSION_CATMULL_ROM
  }, { scaleTo: 100 });
  return path;
}

let base = 0;
function busId() {
  base += 1;
  return base;
}

export default class BusLineFlowModel {
  constructor(busConfig) {
    this._pathSmoothFucntion = null;
    // this._pathSmoothGeoData = [];
    this._busTotalCount = busConfig.busCount;
    this._busData = {};
    this._init(busConfig);
  }

  _init(busConfig) {
    const buslineGeoData = getBuslinesGeoData(busConfig.geoData);
    this._pathSmoothFucntion = interpolateBusLine(buslineGeoData);
    this._dispatchBuses();
  }

  _dispatchBuses() {
    const count = this._busTotalCount;
    let i = 0;
    const busList = this._busData;
    while (i < count) {
      // coefficient: 0 ~ 100, conresponding to a path location in loop.
      const coefficient = math.random(100);
      busList[busId()] = {
        location: this._pathSmoothFucntion(coefficient),
        vacant: math.randomInt(10) > 7,
        coefficient
      };
      i += 1;
    }
  }

  getAllBusInfo() {
    return _.mapValues(this._busData, bus => ({
      location: bus.location, vacant: bus.vacant }));
  }

  async refresh(time) {
    const busSpeedIndexModel = await rtIndexModelFactory.getBusSpeedIndexModel();
    busSpeedIndexModel.getLatestIndexData(time);

    const currentSpeed = busSpeedIndexModel.getLatestIndexData(time);
    const forwardUnit = currentSpeed / 30;
    const forwardRandom = d3.randomNormal(forwardUnit, forwardUnit * 0.1);

    const forward = (bus) => {
      const refreshBus = bus;
      let val = forwardRandom();
      val = math.max(0, math.min(forwardUnit * 1.3, val));
      // const coefficient = bus.coefficient >= 100 ? 100 : bus.coefficient + val;
      const coefficient = bus.coefficient + val;
      // console.log(coefficient);
      refreshBus.location = this._pathSmoothFucntion(coefficient);
      refreshBus.coefficient = coefficient;
    };

    this._busData = _.mapValues(this._busData, (bus) => {
      forward(bus);
      return bus;
    });
  }
}

