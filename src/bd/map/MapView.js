import TileLayer from 'nju/map/layer/TileLayer';
import SuperMapView from 'nju/map/MapView';

export default class MapView extends SuperMapView {
  initLayers() {
    super.initLayers();

    this.baseLayer = new TileLayer({
      // url: 'https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ'
      url: '/map/{z}/{x}/{y}.png'
    });
    this.addLayer(this.baseLayer);
  }
}
