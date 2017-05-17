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
          fillColor: 'green'
        });
        districtFeature.on('click', () => {
          if (this._districts.yellow.includes(name)) {
            this._districts.yellow.splice(this._districts.yellow.indexOf(name), 1);
            this._districts.red.push(name);
            districtFeature.setStyle({
              fillColor: 'red',
              fillOpacity: 0.5
            });
          } else if (this._districts.red.includes(name)) {
            this._districts.red.splice(this._districts.yellow.indexOf(name), 1);
            districtFeature.setStyle({
              fillColor: 'green',
              fillOpacity: 0.2
            });
          } else {
            this._districts.yellow.push(name);
            districtFeature.setStyle({
              fillColor: 'yellow',
              fillOpacity: 0.5
            });
          }
          console.log(JSON.stringify(this._districts, null, 4));
        });
        this.container.addLayer(districtFeature);
      });
    }
  }

}
