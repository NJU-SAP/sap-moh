import Layer from 'nju/map/layer/Layer';


export default class StationLayer extends Layer {
  metadata = {
    properties: {
      stations: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();

    this.stationsContainer = L.featureGroup();

    this.container.addLayer(this.stationsContainer);
  }

  setStations(value) {
    this.setProperty('stations', value);

    if (!value) return;

    //console.log(value);

    //this._updateStations(value);
  }

  _updateStations(stations) {
    this.stationsContainer.clearLayers();

    Object.keys(stations).forEach((busId) => {
      const bus = stations[busId];

      const busIcon = L.divIcon({
        html: '<div class="bus-container"></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: 'bus'
      });
      const busMarker = L.marker([bus.location[1], bus.location[0]], {
        icon: busIcon,
        zIndexOffset: 50000
      });

      this.busesContainer.addLayer(busMarker);
    });
  }

}
