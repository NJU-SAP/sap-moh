import CheckboxView from 'bd/view/CheckboxView';
import DataClockView from 'bd/view/DataClockView';
import MenuItem from 'bd/menu/MenuItem';
import SuperApplication from 'bd/app/Application';

import BusPanel from '../panel/BusPanel';
import CounterTile from '../tile/CounterTile';
import FloatingPanelContainer from '../panel/FloatingPanelContainer';
import MapView from '../map/MapView';
import SpeedTile from '../tile/SpeedTile';
import StateBus from '../state/StateBus';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');

    this._initStateBus();
    this._initModels();
    this._initDataClockView();
    this._initMapView();
    this._initTiles();
    this._initMapLayerCheckbox();
    this._initFloatingPanelContainer();
  }

  _initStateBus() {
    const stateBus = new StateBus();
    this.setModel(sap.ui.getCore().getModel('state'), 'state');
  }

  _initModels() {

  }

  _initDataClockView() {
    const dataClockView = new DataClockView('dataClockView', {
      time: '{state>/timestamp}'
    });
    dataClockView.addStyleClass('top-1 left-7');
    this.addSubview(dataClockView, 'control');
  }

  _initMainMenu() {
    super._initMainMenu();
    const mainMenu = this.getSubview('mainMenu');
    [
      new MenuItem({
        id: 'nowMenuItem',
        text: 'Now'
      }),
      new MenuItem({
        id: 'historyMenuItem',
        text: 'History'
      }),
      new MenuItem({
        id: 'futureMenuItem',
        text: 'Future'
      }),
      new MenuItem({
        id: 'settingsMenuItem',
        icon: 'mf mf-setting'
      }),
      new MenuItem({
        id: 'kaabaMenuItem',
        icon: 'mf mf-kaaba'
      }),
      new MenuItem({
        id: 'mapMenuItem',
        icon: 'mf mf-map'
      }),
      new MenuItem({
        id: 'menuItem1',
        text: ''
      }),
      new MenuItem({
        id: 'menuItem2',
        text: ''
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
    this._initCounterTile();
    this._initSpeedTile();
  }

  _initMapLayerCheckbox() {
    const checkbox = new CheckboxView('congestionCheckboxTile');
    checkbox.addStyleClass('right-3 top-2');
    this.addSubview(checkbox, 'tile');
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

  _initFloatingPanelContainer() {
    const panelContainer = new FloatingPanelContainer('floating-panel-container');
    // panelContainer.$element.css({
    //   opacity: 0
    // });
    this.addSubview(panelContainer, 'floatingPanel');

    const busPanel = new BusPanel('bus-panel', { icon: 'mf mf-bus h3' });
    panelContainer.addPanel(busPanel);
    //const corridorListView = new CorridorListView('corridor-list-view');
    //corridorListView.setModel(sap.ui.getCore().getModel('gis'), 'gis');
    //corridorPanel.setListView(corridorListView);
    // corridorListView.attachCorridorSelected((e) => {
    //   const corridor = e.getParameter('corridor');
    //   this._selectCorridor.apply(this, [corridor]);
    // });

    // const favPanel = new FavPanel('fav-panel', { icon: 'fa fa-star h3' });
    // panelContainer.addPanel(favPanel);
    // const favListView = new FavListView('fav-list-view');
    // favListView.setModel(sap.ui.getCore().getModel('fav'), 'fav');
    // favListView.setModel(sap.ui.getCore().getModel('gis'), 'gis');
    // favPanel.setListView(favListView);
    // favListView.attachFavSelected((e) => {
    //   const target = e.getParameter('target');
    //   if (target.roadId) {
    //     this._selectRoad.apply(this, [target]);
    //   } else if (target.corridorId) {
    //     this._selectCorridor.apply(this, [target]);
    //   }
    // });
  }
}
