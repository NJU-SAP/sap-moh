import SuperApplication from 'bd/app/Application';

import CongestionCheckboxView from '../view/CongestionCheckboxView';
import CounterTile from '../tile/CounterTile';
import MapView from '../map/MapView';
import MenuItem from 'bd/menu/MenuItem';
import SpeedTile from '../tile/SpeedTile';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');

    this._initMapView();
    this._initTiles();
  }

  _initMainMenu() {
    super._initMainMenu();
    const mainMenu = this.getSubview('mainMenu');
    [
      new MenuItem({
        id: 'nowMenuItem',
        text: 'Now',
        active: true
      }),
      new MenuItem({
        id: 'historyMenuItem',
        text: 'History',
        active: true
      }),
      new MenuItem({
        id: 'futureMenuItem',
        text: 'Future',
        active: true
      })
    ].forEach((item) => {
      mainMenu.addSubview(item);
    });
  }

  _initMapView() {
    const mapView = new MapView('mapView');
    mapView.$element.css('position', 'absolute');
    mapView.addStyleClass('row-full col-full');
    this.addSubview(mapView, 'base');
  }

  _initTiles() {
    this._initCheckboxTile();
    this._initCounterTile();
    this._initSpeedTile();
  }

  _initCheckboxTile() {
    const tile = new CongestionCheckboxView('congestionCheckboxTile');
    tile.addStyleClass('right-3 top-2');
    this.addSubview(tile, 'tile');
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
