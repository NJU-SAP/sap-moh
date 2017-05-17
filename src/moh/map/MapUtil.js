import ManagedObject from 'sap/ui/base/ManagedObject';

export default class MapUtil extends ManagedObject {
  static _instance = null;
  static getInstance() {
    if (moh.map.MapUtil._instance === null) {
      moh.map.MapUtil._instance = new moh.map.MapUtil();
    }
    return moh.map.MapUtil._instance;
  }

  getColorOfSpeed(speed) {
    const speedColorTable = ['red', 'yellow', 'rgba(0, 237, 0, 0.8)'];
    const speedLevels = [0, 25, 30, 60];

    let colorLevel = 0;
    while (speedColorTable[colorLevel] !== 'rgba(0, 237, 0, 0.8)') {
      if (speed > speedLevels[colorLevel + 1]) {
        colorLevel += 1;
      } else {
        break;
      }
    }

    return speedColorTable[colorLevel];
  }
}
