import _ from 'lodash';

import { Smooth } from './smooth';

import buslinesRawData from './../../data/gis/bus-lines.json';


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
  });
}
