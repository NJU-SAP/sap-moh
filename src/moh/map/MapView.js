import SuperMapView from 'bd/map/MapView';

export default class MapView extends SuperMapView {
  metadata = {
    properties: {
      baseLayerMode: {
        type: 'string',
        default: 'street'
      },
      perspectiveAngle: {
        type: 'float',
        defaultValue: 0
      },
      defaultZoom: {
        type: 'int',
        defaultValue: 15
      }
    }
  }

  setBaseLayerMode(value) {
    this.setProperty('baseLayerMode', value);
    if (this.baseLayer) {
      this.baseLayer.setUrl(value === 'satellite' ?
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ' :
        'https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ'
      );
    }
  }
}
