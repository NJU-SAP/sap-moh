import TileLayer from 'nju/map/layer/TileLayer';
import SuperMapView from 'nju/map/MapView';

export default class MapView extends SuperMapView {
  DEFAULT_BASE_LAYER_URL = '/map/{z}/{x}/{y}.png';
  FALLBACK_BASE_LAYER_URL = 'https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ';

  async initLayers() {
    super.initLayers();

    try {
      await $.ajax(this.DEFAULT_BASE_LAYER_URL.replace('{z}', 10).replace('{x}', 623).replace('{y}', 448));
      this.baseLayer = new TileLayer({
        url: this.DEFAULT_BASE_LAYER_URL
      });
    } catch (e) {
      this.baseLayer = new TileLayer({
        url: this.FALLBACK_BASE_LAYER_URL
      });
    }
    this.addLayer(this.baseLayer);
  }
}
