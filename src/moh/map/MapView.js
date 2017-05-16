import SuperMapView from 'bd/map/MapView';

import BusLayer from './layers/BusLayer';
import BusLineLayer from './layers/BusLineLayer';
import GOPLayer from './layers/GOPLayer';
import HeatmapLayer from './layers/HeatmapLayer';
import StationLayer from './layers/StationLayer';
import TrafficLayer from './layers/TrafficLayer';


export default class MapView extends SuperMapView {
  metadata = {
    properties: {
      baseLayerMode: {
        type: 'string',
        default: 'street'
      },
      perspectiveAngle: {
        type: 'float',
        defaultValue: 0
      },
      defaultZoom: {
        type: 'int',
        defaultValue: 15
      },
      kaaba: {
        type: 'boolean',
        defaultValue: false
      }
    },
    events: {
      zoomChanged: {
      },
      stationChange: {
        parameters: {
          id: { type: 'int' },
        }
      },
      busChange: {
        parameters: {
          id: { type: 'string' }
        }
      }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-map-view');
  }

  afterInit() {
    super.afterInit();

    this._zoomLevel = this.getDefaultZoom();

    let zoomEndTimer = null;
    this.map.on('zoomstart', () => {
      if (zoomEndTimer) {
        clearTimeout(zoomEndTimer);
        zoomEndTimer = null;
      }
    });
    this.map.on('zoomend', () => {
      this.removeStyleClass(`zoom-level-${this._zoomLevel}`);
      const zoomLevel = this.map.getZoom();
      this._zoomLevel = zoomLevel;
      this.addStyleClass(`zoom-level-${this._zoomLevel}`);

      if (zoomEndTimer) {
        clearTimeout(zoomEndTimer);
      }
      zoomEndTimer = setTimeout(() => {
        this.fireZoomChanged();
      }, 500);
    });
  }

  initLayers() {
    super.initLayers();

    this.trafficLayer = new TrafficLayer('traffic-layer', {
      edges: '{gis>/edges}',
      edgeSpeed: '{traffic>/edge-speed}'
    });
    this.addLayer(this.trafficLayer);

    this.busLayer = new BusLayer('bus-layer', {
      buses: '{bus>/rt}'
    });
    this.addLayer(this.busLayer);
    this.busLayer.attachBusSelect((e) => {
      const id = e.getParameter('busId');
      this.fireBusChange({
        id
      });
    });

    this.stationLayer = new StationLayer('station-layer', {
      stations: '{gis>/stations}'
    });
    this.addLayer(this.stationLayer);
    this.stationLayer.attachStationSelect((e) => {
      const id = e.getParameter('id');
      this.fireStationChange({
        id
      });
    });

    this.gopLayer = new GOPLayer('gop-layer', {
      group: '{pilgrim>/group}'
    });
    this.addLayer(this.gopLayer);

    this.heatmapLayer = new HeatmapLayer('heatmap-layer', {
      heatmap: '{pilgrim>/heatmap}'
    });
    this.addLayer(this.heatmapLayer);
    setTimeout(() => {
      this.map.addLayer(this.heatmapLayer.heatmap);
    }, 2000);

    this.busLineLayer = new BusLineLayer('bus-line-layer');
    this.addLayer(this.busLineLayer);
  }

  setBaseLayerMode(value) {
    this.setProperty('baseLayerMode', value);
    if (this.baseLayer) {
      this.baseLayer.setUrl(value === 'satellite' ?
        'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ' :
        'https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVucnkxOTg0IiwiYSI6ImI1a0FvUzQifQ.zLCAzKNjXNiRUQoJBzAsZQ'
      );
    }
  }


  setKaaba(value) {
    this.setProperty('kaaba', value);

    if (value) {
      this.setCenterLocation([21.4225, 39.8262], this.getMaxZoom());
    } else {
      this.setCenterLocation(this.getDefaultCenterLocation(), this.getDefaultZoom());
    }

    this.toggleLayer(this.stationLayer, !value);
    this.toggleLayer(this.trafficLayer, !value);
    this.toggleLayer(this.busLayer, !value);
    this.toggleLayer(this.gopLayer, value);

    if (value) {
      this.showLayer(this.heatmapLayer);
      this.map.addLayer(this.heatmapLayer.heatmap);
    } else {
      this.hideLayer(this.heatmapLayer);
      this.map.removeLayer(this.heatmapLayer.heatmap);
    }
  }
}
