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

    if (!value) return;

    this.edgesContainer.clearLayers();

    this.edgeGeoJSON = L.geoJson(value, {
      style: () => {
        return {
          weight: 4,
          opacity: 0,
          color: '#eee'
        };
      }
    });
    this.edgesContainer.addLayer(this.edgeGeoJSON);
  }

  setEdgeSpeed(value) {
    this.setProperty('edgeSpeed', value);

    if (!value || !this.edgeGeoJSON) return;

    this.edgeGeoJSON.eachLayer((edge) => {
      const edgeId = edge.feature.properties.edge_id;
      const color = this._getColorOfSpeed(value[edgeId]);
      edge.setStyle({
        color,
        opacity: 0.6
      });
    });
  }

  _getColorOfSpeed(speed) {
    const speedColorTable = ['red', 'yellow', 'rgba(0, 237, 0, 0.8)'];
    const speedLevels = [0, 25, 30, 60];

    let colorLevel = 0;
    while (speedColorTable[colorLevel] !== 'rgba(0, 237, 0, 0.8)') {
      if (speed > speedLevels[colorLevel + 1]) {
        colorLevel += 1;
      } else {
        break;
      }
    }

    return speedColorTable[colorLevel];
  }
}
