import ServiceClient from './ServiceClient';


export default class BusServiceClient extends ServiceClient {
  static _instance = null;
  static getInstance() {
    if (moh.service.BusServiceClient._instance === null) {
      moh.service.BusServiceClient._instance = new moh.service.BusServiceClient();
    }
    return moh.service.BusServiceClient._instance;
  }

  getBaseUrl() {
    return '/api/bus/';
  }

  async getArrivals(stationId) {
    return this.fetch('arrivals', {
      stationId
    });
  }
}
