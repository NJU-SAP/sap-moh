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

    Object.keys(buses).forEach((busId) => {
      const bus = buses[busId];

      const iconSize = 38;
      const busIcon = L.divIcon({
        html: `<div class="bus-container ${bus.vacant ? 'vacant' : ''}"><span class="mf mf-bus h1"></div>`,
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2],
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
