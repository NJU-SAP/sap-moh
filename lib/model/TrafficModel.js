import math from 'mathjs';

import GisModel from './GisModel';
import { rtIndexModelFactory } from './IndexModel';

const gisModel = new GisModel();

class TrafficModel {
  constructor() {
    this._edgeSpeedDict = {};
    this._busSpeedIndexModel = {};
    this._init = false;
  }

  async init() {
    const edgeData = await gisModel.getEdgesData();
    // retrive all egde ids
    this._edgeSpeedDict = {};
    const dict = this._edgeSpeedDict;
    edgeData.features.forEach((v) => { dict[v.properties.edge_id] = 0; });
    this._busSpeedIndexModel = await rtIndexModelFactory.getBusSpeedIndexModel();
  }

  async initEdgeTrafficSpeed(date) {
    const initSpeed = this._busSpeedIndexModel.getLatestIndexData(date);
    const floatPosiibility = 0.7;
    const floatRate = 0.3;

    const speedGenerator = () => {
      if (math.random() < floatPosiibility) {
        return math.round(initSpeed * (1 + math.random(-floatRate, floatRate)), 2);
      }
      return initSpeed;
    };

    for (const key in this._edgeSpeedDict) {
      this._edgeSpeedDict[key] = speedGenerator();
    }
  }

  getEdgeSpeedData() { return this._edgeSpeedDict; }

  async refreshTrafficSpeed(date) {
    if (!this._init) {
      await this.initEdgeTrafficSpeed(date);
      this._init = true;
    } else {
      const curentSpeed = this._busSpeedIndexModel.getLatestIndexData(date);
      const changePosiibility = 0.7;
      const floatRate = 0.3;

      const speedGenerator = () =>
          math.round(curentSpeed * (1 + math.random(-floatRate, floatRate)), 2);

      for (const key in this._edgeSpeedDict) {
        if (math.random() < changePosiibility) {
          this._edgeSpeedDict[key] = speedGenerator();
        }
      }
    }
  }
}

class TrafficModelFactory {
  constructor() { this.trafficModel = null; }

  async getTrafficModel() {
    if (this.trafficModel === null) {
      this.trafficModel = new TrafficModel();
      await this.trafficModel.init();
    }
    return this.trafficModel;
  }
}

const trafficModelFactory = new TrafficModelFactory();

export default trafficModelFactory;
