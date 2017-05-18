import _ from 'lodash';
import math from 'mathjs';
import config from 'config';

import { Smooth } from './smooth';
import { loadDataFromFile } from './IndexModel';
import GisModel from './GisModel';


const d3 = require('d3-random');

const gisModel = new GisModel();


async function getDistrictsDict() {
  const districtData = await gisModel.getDistrictsData();
  return _.fromPairs(districtData.features.map(f => [f.properties.ENAME, {}]));
}

export default class DistrictTrafficModel {

  constructor(conf) {
    this._init = false;
    this.conf = conf;
    this.seq = 0;
  }

  async init() {
    if (!this._init) {
      const districtDict = await getDistrictsDict();
      const districtSize = _.size(districtDict);
      const specificDistrictSetting = config.get('districts');
      const overAllSpeedData = await loadDataFromFile('./data/index/overall-speed');
      this._districtDict = districtDict;
      // yellow
      const yellowTrafficFactor = 0.9;
      this._initTrafficTrend(
        specificDistrictSetting.yellow,
        overAllSpeedData,
        {
          trafficFactor: yellowTrafficFactor,
          deviationFactor: 0.15,
          standardize: v => math.max(26, v)
        }
      );
      // red
      const redTrafficFactor = 0.75;
      this._initTrafficTrend(
        specificDistrictSetting.red,
        overAllSpeedData,
        {
          trafficFactor: redTrafficFactor,
          deviationFactor: 0.2,
          standardize: v => v
        }
      );

      const restOverallSpeedData =
        overAllSpeedData.map((speed) => {
          const yellowDistSize = specificDistrictSetting.yellow.length;
          const redDistSize = specificDistrictSetting.red.length;
          const restSpeed = (speed * districtSize)
            - (speed * yellowTrafficFactor * yellowDistSize)
            - (speed * redTrafficFactor * redDistSize);
          const restAvgSpeed = restSpeed / (districtSize - yellowDistSize - redDistSize);
          return restAvgSpeed * 1.2;
        });
      // green
      this._initTrafficTrend(
        _.keys(
        _.omit(
          this._districtDict,
          _.concat(specificDistrictSetting.yellow, specificDistrictSetting.red,
          ))),
          restOverallSpeedData,
        {
          trafficFactor: 1.4,
          deviationFactor: 0.3,
          standardize: v => math.max(35, v)
        });
      this._init = true;
    }
  }

  async getDistrictsTraffic(time) {
    let seconds = 0;
    if (this.conf === 'trigger') {
      seconds = this.seq;
      this.seq = (this.seq + 600) % 86400;
    } else {
      seconds = time.seconds() + (time.minutes() * 60) + (time.hours() * 3600);
    }
    return _.mapValues(
      this._districtDict,
      districtTraffic => math.round(districtTraffic.standardize(districtTraffic.smooth(seconds), 2)));
  }

  _initTrafficTrend(
    districtList,
    overAllSpeedData,
    {
      trafficFactor,
      deviationFactor,
      standardize,
    }) {
    const trendRandom = overAllSpeedData
      .map(speed => speed * trafficFactor)                // modified
      .map((speed) => {
        const r = d3.randomNormal(speed, speed * deviationFactor / 3);   // randomize
        return () => math.max(0, r());                    // should not more than 0
      });
    districtList.forEach((district) => {
      const districtTraffic = this._districtDict[district];
      if (districtTraffic === undefined) {
        console.error(`District ${district} not found in districts.json!`);
        return;
      }
      // get random speed trend
      const overallTrend = trendRandom.map(random => random());
      const smooth = Smooth(overallTrend, { scaleTo: [0, 86400] });
      districtTraffic.smooth = smooth;
      districtTraffic.standardize = standardize;
    });
  }
}

export { getDistrictsDict };
