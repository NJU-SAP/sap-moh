import Layer from 'nju/map/layer/Layer';


export default class StationLayer extends Layer {
  metadata = {
    properties: {
      stations: { type: 'object', bindable: true }
    },
    events: {
      stationSelect: {
        parameters: {
          id: { type: 'int' },
        }
      }
    }
  }

  init() {
    super.init();

    this._stationMarkers = [];
    this._selectedMarker = null;

    this.stationsContainer = L.featureGroup();

    this.container.addLayer(this.stationsContainer);
  }

  setStations(value) {
    this.setProperty('stations', value);

    if (!value) return;

    this._updateStations(value);
  }

  _updateStations(stations) {
    this.stationsContainer.clearLayers();

    stations.forEach((station) => {
      const iconSize = 38;
      const stationIcon = L.divIcon({
        html: '<div class="station-container"></div>',
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2],
        className: 'station'
      });
      const stationMarker = L.marker([station.location[1], station.location[0]], {
        icon: stationIcon,
        zIndexOffset: 500,
        stationId: station.id,
        stationName: station.name
      });
      stationMarker.on('click', (e) => {
        if (this._selectedMarker === null) {
          $(stationMarker._icon).addClass('selected');
          this._selectedMarker = stationMarker;
        } else {
          if (this._selectedMarker === stationMarker) {
            $(stationMarker._icon).removeClass('selected');
            this._selectedMarker = null;
          } else {
            $(this._selectedMarker._icon).removeClass('selected');
            $(stationMarker._icon).addClass('selected');
            this._selectedMarker = stationMarker;
          }
        }

        this.fireStationSelect({
          id: this._selectedMarker === null ? null : e.target.options.stationId
        });
      });

      this._stationMarkers.push(stationMarker);
      this.stationsContainer.addLayer(stationMarker);
    });
  }

}
