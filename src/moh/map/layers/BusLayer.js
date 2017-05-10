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
    Object.keys(buses).forEach((busId) => {
      const bus = buses[busId];

      const busIcon = L.divIcon({
        html: '<div class="bus-container"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        className: 'bus'
      });
      const busMarker = L.marker([bus.location[1], bus.location[0]], {
        icon: busIcon,
        zIndexOffset: 500
      });

      this.busesContainer.addLayer(busMarker);
    });
  }

}
