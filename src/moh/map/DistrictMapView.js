import SuperMapView from 'bd/map/MapView';


export default class MapView extends SuperMapView {
  metadata = {
    properties: {

    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-district-map');
  }

  afterInit() {
    super.afterInit();
  }

  initLayers() {
    super.initLayers();
  }
}
