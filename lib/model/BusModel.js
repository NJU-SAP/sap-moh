import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';
import buslinesRawData from './../../data/gis/bus-lines.json';
import { rtIndexModelFactory } from './IndexModel';

// can only use require due to incorrect export in d3-random
const d3 = require('d3-random');

function getBuslinesGeoData() {
  // [ { hor, ver }, {...}, ...]
  return _.split(buslinesRawData[0], ',')
      .map(pointStr => _.split(pointStr, ' '))
      .map(splitStr => [
        parseFloat(splitStr[0]),
        parseFloat(splitStr[1])
      ]);
}

function interpolateBusLine(buslineData) {
  const path = Smooth(buslineData, {
    method: Smooth.METHOD_CUBIC,
    clip: Smooth.CLIP_MIRROR,
    // cubicTension: Smooth.CUBIC_TENSION_CATMULL_ROM
  }, { scaleTo: 100 });
  return path;
}

export default class BusLineFlowModel {
  constructor(config) {
    this._pathSmoothFucntion = null;
    // this._pathSmoothGeoData = [];
    this._busTotalCount = config.busCount;
    this._busData = { };
    this._buslineGeoData = [];
    this._init();
  }

  _init() {
    const buslineGeoData = getBuslinesGeoData();
    this._buslineGeoData = buslineGeoData;
    this._pathSmoothFucntion = interpolateBusLine(buslineGeoData);
    this._dispatchBuses();
  }

  _dispatchBuses() {
    // let n = this._buslineGeoData.length;
    let n = this._busTotalCount;
    const busList = this._busData;
    while (n > 0) {
      // coe: 0 ~ 1, conresponding to a path location in loop.
      const coefficient = math.random(100);
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
    const busSpeedIndexModel = await rtIndexModelFactory.getBusSpeedIndexModel();
    busSpeedIndexModel.getLatestIndexData(time);

    const currentSpeed = busSpeedIndexModel.getLatestIndexData(time);
    const forwardUnit = currentSpeed / 30;
    const forwardRandom = d3.randomNormal(forwardUnit, forwardUnit * 0.1);

    const forward = (bus) => {
      const refreshBus = bus;
      let val = forwardRandom();
      val = math.max(0, math.min(forwardUnit * 1.3, val));
      const coefficient =
          bus.coefficient + val; // > 100 ? val : bus.coefficient + val;
      refreshBus.location = this._pathSmoothFucntion(coefficient);
      refreshBus.coefficient = coefficient;
    };

    this._busData = _.mapValues(this._busData, (bus) => {
      forward(bus);
      return bus;
    });
  }
}
