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

  constructor() {
    this._init = false;
  }

  async init() {
    if (! this._init) {
      const districtDict = await getDistrictsDict();
      const districtSize = _.size(districtDict);
      const specificDistrictSetting = config.get('districts');
      const overAllSpeedData = await loadDataFromFile('./data/index/overall-speed');

      this._districtDict = districtDict;
      this._init = true;
    }
  }

  async getDistrictsTraffic() {
    return _.mapValues(this._districtDict,  o => math.round(math.random(15, 50), 2));
  }
}

export { getDistrictsDict };
