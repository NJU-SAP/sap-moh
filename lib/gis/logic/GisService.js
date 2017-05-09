import fs from 'fs';

async function readFile(filename) {
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
    return readFile('./data/gis/ways.json');
  }

  async getEdgesData() {
    return readFile('./data/gis/edges.json');
  }

}
