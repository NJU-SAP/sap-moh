import Model from 'nju/model/Model';

import GisServiceClient from '../service/GisServiceClient';


export default class GisModel extends Model {
  async initialLoad() {
    await this._loadEdges();
    await this._loadStations();
    this.fireEvent('initialLoadCompleted');
  }

  async _loadEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    this.setProperty('/edges', edges);
  }

  async _loadStations() {
    const stations = await GisServiceClient.getInstance().getStations();
    this.setProperty('/stations', stations);
  }
}
