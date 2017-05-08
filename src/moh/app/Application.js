import SuperApplication from 'bd/app/Application';

import CounterTile from '../tile/CounterTile';
import MapView from '../map/MapView';
import SpeedTile from '../tile/SpeedTile';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');

    this._initMapView();
    this._initTiles();
  }

  _initMapView() {
    const mapView = new MapView('mapView');
    mapView.$element.css('position', 'absolute');
    mapView.addStyleClass('row-full col-full');
    this.addSubview(mapView, 'base');
  }

  _initTiles() {
    this._initCounterTile();
    this._initSpeedTile();
  }

  _initCounterTile() {
    const tile = new CounterTile('counterTile');
    tile.addStyleClass('right-1 bottom-5');
    tile.setModel(sap.ui.getCore().getModel('index'), 'index');
    tile.setModel(sap.ui.getCore().getModel('config'), 'config');
    this.addSubview(tile, 'tile');
  }

  _initSpeedTile() {
    const tile = new SpeedTile('speedTile');
    tile.addStyleClass('right-1 bottom-1');
    tile.setModel(sap.ui.getCore().getModel('index'), 'index');
    tile.setModel(sap.ui.getCore().getModel('config'), 'config');
    this.addSubview(tile, 'tile');
  }
}
