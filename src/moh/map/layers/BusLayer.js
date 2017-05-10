import Layer from 'nju/map/layer/Layer';


export default class BusLayer extends Layer {
  metadata = {
    properties: {
      buses: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();

    this.busesContainer = L.featureGroup();

    this.container.addLayer(this.busesContainer);
  }

  setBuses(value) {
    this.setProperty('buses', value);

    if (!value) return;

    this._updateBuses(value);
  }

  _updateBuses(buses) {
    this.busesContainer.clearLayers();

    console.log(buses);
  }

}
