import ServiceClient from './ServiceClient';


export default class PilgrimServiceClient extends ServiceClient {
  static _instance = null;
  static getInstance() {
    if (moh.service.PilgrimServiceClient._instance === null) {
      moh.service.PilgrimServiceClient._instance = new moh.service.PilgrimServiceClient();
    }
    return moh.service.PilgrimServiceClient._instance;
  }

  getBaseUrl() {
    return '/api/pilgrim/';
  }

  getHeatmap(time) {
    return this.fetch('heatmap', {
      time
    });
  }
}
