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

  async getEdges() {
    if (!this._edges) {
      this._edges = await this.fetch('edges');
    }
    return this._edges;
  }

  async getBusStations() {
    if (!this._stations) {
      this._stations = await this.fetch('bus/stations');
    }
    return this._stations;
  }

  async getBusLines() {
    if (!this._stations) {
      this._stations = await this.fetch('bus/lines');
    }
    return this._stations;
  }
}
