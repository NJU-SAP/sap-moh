import TileLayer from 'nju/map/layer/TileLayer';
import SuperMapView from 'nju/map/MapView';

export default class MapView extends SuperMapView {
  initLayers() {
    super.initLayers();

    const baseLayer = new TileLayer({ url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' });
    this.addLayer(baseLayer);
  }
}
