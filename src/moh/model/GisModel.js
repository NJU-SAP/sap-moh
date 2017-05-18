import Model from 'nju/model/Model';

import GisServiceClient from '../service/GisServiceClient';


export default class GisModel extends Model {
  async initialLoad() {
    await this._loadDistricts();
    await this._loadEdges();
    await this._loadBusStations();
    await this._loadBusLines();
    this.fireEvent('initialLoadCompleted');
  }

  async _loadDistricts() {
    const districts = await GisServiceClient.getInstance().getDistricts();
    this.setProperty('/districts', districts);
  }

  async _loadEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    this.setProperty('/edges', edges);
  }

  async _loadBusStations() {
    const stations = await GisServiceClient.getInstance().getBusStations();
    this.setProperty('/stations', stations);
  }

  async _loadBusLines() {
    const lines = await GisServiceClient.getInstance().getBusLines();
    this.setProperty('/lines', lines);
  }

  getStation(id) {
    const stations = this.getProperty('/stations');
    return stations.find(station => station.id === id);
  }
}
