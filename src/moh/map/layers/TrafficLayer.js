import Layer from 'nju/map/layer/Layer';

import MapUtil from '../MapUtil';


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
      const color = MapUtil.getInstance()._getColorOfSpeed(value[edgeId]);
      edge.setStyle({
        color,
        opacity: 0.6
      });
    });
  }
}
