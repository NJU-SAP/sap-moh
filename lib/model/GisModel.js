import fs from 'fs';

async function readJSONFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(data));
      }
    });
  });
}

export default class GisModel {

  async getWaysData() {
    return readJSONFile('./data/gis/ways.json');
  }

  async getEdgesData() {
    return readJSONFile('./data/gis/edges.json');
  }

  async getStationsData() {
    return readJSONFile('./data/gis/stations.json');
  }

  async getLinesData() {
    return readJSONFile('./data/gis/bus-lines.json');
  }


}
