import fs from 'fs';

async function readJSONFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

export default class GisService {

  async getWaysData() {
    return readJSONFile('./data/gis/ways.json');
  }

  async getEdgesData() {
    return readJSONFile('./data/gis/edges.json');
  }

}
