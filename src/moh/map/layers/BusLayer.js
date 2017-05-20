import Layer from 'nju/map/layer/Layer';


export default class BusLayer extends Layer {
  metadata = {
    properties: {
      buses: { type: 'object', bindable: true }
    },
    events: {
      busSelect: {
        parameters: {
          busId: { type: 'string' }
        }
      }
    }
  }

  init() {
    super.init();

    this.busesContainer = L.featureGroup();

    this._selecteBusId = null;

    this.container.addLayer(this.busesContainer);
  }

  setBuses(value) {
    this.setProperty('buses', value);

    if (!value) return;

    this._updateBuses(value);
  }

  _busMakers = {};
  _updateBuses(buses) {
    Object.keys(buses).forEach((busId) => {
      const bus = buses[busId];
      if (!this._busMakers[busId]) {
        const iconSize = 38;
        const busIcon = L.divIcon({
          html: `<div class="bus-container ${bus.vacant ? 'vacant' : ''}"><span class="mf mf-bus h1"></div>`,
          iconSize: [iconSize, iconSize],
          iconAnchor: [iconSize / 2, iconSize / 2],
          className: 'bus'
        });
        const busMarker = L.marker([bus.location[1], bus.location[0]], {
          icon: busIcon,
          zIndexOffset: 500,
          busId
        });

        busMarker.on('click', (e) => {
          const id = e.target.options.busId;
          if (this._selecteBusId !== id) {
            this.fireBusSelect({ busId: id });
          }
        });

        this.busesContainer.addLayer(busMarker);
        this._busMakers[busId] = busMarker;
      } else {
        const busMarker = this._busMakers[busId];
        busMarker.setLatLng([bus.location[1], bus.location[0]]);
      }
    });
  }

}
