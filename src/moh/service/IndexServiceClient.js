import ServiceClient from './ServiceClient';


export default class IndexServiceClient extends ServiceClient {
  static _instance = null;
  static getInstance() {
    if (moh.service.IndexServiceClient._instance === null) {
      moh.service.IndexServiceClient._instance = new moh.service.IndexServiceClient();
    }
    return moh.service.IndexServiceClient._instance;
  }

  getBaseUrl() {
    return '/api/index/';
  }

  getRt(from, to) {
    return this.fetch('rt', {
      from,
      to
    });
  }
}
