import ServiceClient from './ServiceClient';


export default class GisServiceClient extends ServiceClient {
  static _instance = null;
  static getInstance() {
    if (moh.service.GisServiceClient._instance === null) {
      moh.service.GisServiceClient._instance = new moh.service.GisServiceClient();
    }
    return moh.service.GisServiceClient._instance;
  }

  getBaseUrl() {
    return '/api/gis/';
  }

  getEdges() {
    return this.fetch('edges');
  }

  getWays() {
    return this.fetch('edges');
  }
}
