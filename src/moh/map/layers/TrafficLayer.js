import Layer from 'nju/map/layer/Layer';

import GisServiceClient from '../../service/GisServiceClient';


export default class TrafficLayer extends Layer {
  init() {
    super.init();

    this._initEdges();
  }

  async _initEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    console.log(edges);
  }
}
