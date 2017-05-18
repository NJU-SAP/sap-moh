import Layer from 'nju/map/layer/Layer';

import MapUtil from '../MapUtil';


export default class DistrictLayer extends Layer {
  metadata = {
    properties: {
      districts: {
        type: 'object',
        default: null
      },
      districtSpeed: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
  }


  _districtFeatures = {};
  setDistricts(districts) {
    this.setProperty('districts', districts);
    this.container.clearLayers();
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
        this._districtFeatures[name] = districtFeature;
      });
    }
  }

  setDistrictSpeed(districtSpeed) {
    this.setProperty('districtSpeed', districtSpeed);
    if (districtSpeed) {
      for (const key in districtSpeed) {
        const speed = districtSpeed[key];
        if (typeof (speed) === 'number') {
          this._districtFeatures[key].setStyle({
            fillColor: MapUtil.getInstance().getColorOfSpeed(speed)
          });
        }
      }
    }
  }


  _districtColors = { yellow: [], red: [] };
  _districtFeature_onClick(name, districtFeature) {
    if (this._districtColors.yellow.includes(name)) {
      this._districtColors.yellow.splice(this._districtColors.yellow.indexOf(name), 1);
      this._districtColors.red.push(name);
      districtFeature.setStyle({
        fillColor: 'red',
        fillOpacity: 0.3
      });
    } else if (this._districtColors.red.includes(name)) {
      this._districtColors.red.splice(this._districtColors.yellow.indexOf(name), 1);
      districtFeature.setStyle({
        fillColor: 'green',
        fillOpacity: 0.3
      });
    } else {
      this._districtColors.yellow.push(name);
      districtFeature.setStyle({
        fillColor: 'yellow',
        fillOpacity: 0.3
      });
    }
    console.log(JSON.stringify(this._districtColors, null, 4));
  }
}
