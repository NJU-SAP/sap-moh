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


  _districts = { yellow: [], red: [] };
  setDistricts(districts) {
    this.setProperty('districts', districts);
    if (districts) {
      districts.features.forEach((districtFeatureRaw) => {
        const name = districtFeatureRaw.properties.ENAME;
        const districtFeature = L.geoJson(districtFeatureRaw, {
          weight: 1,
          color: 'white',
          opacity: 0.2,
          fillColor: 'green',
          fillOpacity: 0.3
        });
        districtFeature.on('click', this._districtFeature_onClick.bind(this, name, districtFeature));
        this.container.addLayer(districtFeature);
      });
    }
  }


  _districtFeature_onClick(name, districtFeature) {
    if (this._districts.yellow.includes(name)) {
      this._districts.yellow.splice(this._districts.yellow.indexOf(name), 1);
      this._districts.red.push(name);
      districtFeature.setStyle({
        fillColor: 'red',
        fillOpacity: 0.3
      });
    } else if (this._districts.red.includes(name)) {
      this._districts.red.splice(this._districts.yellow.indexOf(name), 1);
      districtFeature.setStyle({
        fillColor: 'green',
        fillOpacity: 0.3
      });
    } else {
      this._districts.yellow.push(name);
      districtFeature.setStyle({
        fillColor: 'yellow',
        fillOpacity: 0.3
      });
    }
    console.log(JSON.stringify(this._districts, null, 4));
  }
}
