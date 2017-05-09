import Layer from 'nju/map/layer/Layer';

import GisServiceClient from '../../service/GisServiceClient';


export default class TrafficLayer extends Layer {
  init() {
    super.init();

    this.edgesContainer = L.featureGroup();

    this.container.addLayer(this.edgesContainer);

    this._initEdges();
  }

  async _initEdges() {
    const edges = await GisServiceClient.getInstance().getEdges();
    const geoJSON = L.geoJson(edges);

    this.edgesContainer.addLayer(geoJSON);
  }
}
