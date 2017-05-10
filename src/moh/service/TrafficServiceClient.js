import ServiceClient from './ServiceClient';


export default class TrafficServiceClient extends ServiceClient {
  static _instance = null;
  static getInstance() {
    if (moh.service.TrafficServiceClient._instance === null) {
      moh.service.TrafficServiceClient._instance = new moh.service.TrafficServiceClient();
    }
    return moh.service.TrafficServiceClient._instance;
  }

  getBaseUrl() {
    return '/api/traffic/';
  }

  async getEdgeSpeed(time) {
    return this.fetch('edge-speed', {
      time
    });
  }
}
