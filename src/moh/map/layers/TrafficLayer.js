import Layer from 'nju/map/layer/Layer';


export default class TrafficLayer extends Layer {
  metadata = {
    properties: {
      edges: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();

    this.edgesContainer = L.featureGroup();

    this.container.addLayer(this.edgesContainer);
  }

  setEdges(value) {
    this.setProperty('edges', value);

    if (value) {
      this.edgesContainer.clearLayers();

      const geoJSON = L.geoJson(value);
      this.edgesContainer.addLayer(geoJSON);
    }
  }
}
