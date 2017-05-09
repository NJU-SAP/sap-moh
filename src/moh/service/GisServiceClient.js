import ServiceClient from './ServiceClient';


export default class GisServiceClient extends ServiceClient {
  getBaseUrl() {
    return '/api/gis';
  }

  getEdges() {
    return this.fetch('edges');
  }

  getWays() {
    return this.fetch('edges');
  }
}
