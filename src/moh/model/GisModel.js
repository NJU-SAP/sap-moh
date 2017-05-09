import Model from 'nju/model/Model';

import GisServiceClient from '../../service/GisServiceClient';


export default class GisModel extends Model {
  constructor(props = {}) {
    super(props);
    this._initEdges();
  }

  async _initEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    this.setProperty('/edges', edges);
  }
}
