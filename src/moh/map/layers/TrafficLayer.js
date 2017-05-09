import Layer from 'nju/map/layer/Layer';


export default class TrafficLayer extends Layer {
  metadata = {
    properties: {
      edges: { type: 'object', bindable: true },
      edgeSpeed: { type: 'object', bindable: true }
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

      const geoJSON = L.geoJson(value, {
        style: () => {
          return { weight: 2 };
        }
      });
      this.edgesContainer.addLayer(geoJSON);
    }
  }

  setEdgeSpeed(value) {
    this.setProperty('edgeSpeed', value);
    console.log(value);
  }
}
