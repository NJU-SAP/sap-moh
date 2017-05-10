import Model from 'nju/model/Model';

import GisServiceClient from '../service/GisServiceClient';


export default class GisModel extends Model {
  async initialLoad() {
    await this._loadEdges();
    this.fireEvent('initialLoadCompleted');
  }

  async _loadEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    this.setProperty('/edges', edges);
  }
}
