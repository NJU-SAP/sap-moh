import Layer from 'nju/map/layer/Layer';


export default class DistrictLayer extends Layer {
  metadata = {
    properties: {
      districts: {
        type: 'object',
        default: null
      }
    }
  }

  init() {
    super.init();
  }

  setDistricts(districts) {
    this.setProperty('districts', districts);
    const layer = L.geoJson(districts, {
      weight: 1
    });
    this.container.addLayer(layer);
  }

}
