import SuperMapView from 'bd/map/MapView';

import DistrictLayer from './layers/DistrictLayer';

export default class MapView extends SuperMapView {
  metadata = {
    properties: {
      defaultZoom: {
        type: 'int',
        defaultValue: 12
      },
      pocketZoom: {
        type: 'int',
        defaultValue: 12
      },
      normalZoom: {
        type: 'int',
        defaultValue: 15
      }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-district-map');
  }

  initLayers() {
    super.initLayers();
    this.districtLayer = new DistrictLayer('district-layer', {
      districts: '{gis>/districts}',
      districtSpeed: '{traffic>/district-speed}'
    });
    this.addLayer(this.districtLayer);
  }
}
