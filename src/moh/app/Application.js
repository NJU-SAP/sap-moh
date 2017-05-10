import StateBus from 'nju/state/StateBus';

import Checkbox from 'bd/view/Checkbox';
import DataClockView from 'bd/view/DataClockView';
import MenuItem from 'bd/menu/MenuItem';
import SuperApplication from 'bd/app/Application';

import BusPanel from '../panel/BusPanel';
import BusTableView from '../view/BusTableView';
import CounterTile from '../tile/CounterTile';
import FloatingPanelContainer from '../panel/FloatingPanelContainer';
import GisModel from '../model/GisModel';
import IndexModel from '../model/IndexModel';
import TrafficModel from '../model/TrafficModel';
import MapView from '../map/MapView';
import SpeedTile from '../tile/SpeedTile';
import MohStateBus from '../state/StateBus';

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
    const stateBus = new MohStateBus();
    this.setModel(sap.ui.getCore().getModel('state'), 'state');
  }

  _initModels() {
    this.showLoading();
    const gisModel = new GisModel();
    gisModel.initialLoad();
    gisModel.attachEvent('initialLoadCompleted', () => {
      Promise.all([
        trafficModel.initialLoad(),
        indexModel.initialLoad()
      ]).then(() => {
        this.hideLoading();
      });
    });

    this.setModel(gisModel, 'gis');
    const trafficModel = new TrafficModel();
    this.setModel(trafficModel, 'traffic');
    const indexModel = new IndexModel();
    this.setModel(indexModel, 'index');
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

    const nowMenuItem = new MenuItem({
      id: 'nowMenuItem',
      text: 'Now',
      press: () => {

      }
    });

    const kaabaMenuItem = new MenuItem({
      id: 'kaabaMenuItem',
      icon: 'mf mf-kaaba'
    });

    const mapMenuItem = new MenuItem({
      id: 'mapMenuItem',
      icon: 'mf mf-map',
      press: () => {
        mapMenuItem.setActive(!mapMenuItem.getActive());
        if (mapMenuItem.getActive()) {
          this.mapView.setBaseLayerMode('satellite');
        } else {
          this.mapView.setBaseLayerMode('street');
        }
      }
    });

    const zoomInMenuItem = new MenuItem({
      id: 'zoomInMenuItem',
      text: '+',
      press: () => {
        this.mapView.zoomIn();
      }
    });

    const zoomOutMenuItem = new MenuItem({
      id: 'zoomOutMenuItem',
      text: '-',
      press: () => {
        this.mapView.zoomOut();
      }
    });

    const mainMenu = this.getSubview('mainMenu');
    [
      nowMenuItem,
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
      kaabaMenuItem,
      mapMenuItem,
      zoomInMenuItem,
      zoomOutMenuItem
    ].forEach((item) => {
      mainMenu.addSubview(item);
    });
  }

  _initMapView() {
    this.mapView = new MapView('mapView', {
      zoomChanged: () => {
        const zoom = this.mapView.getZoom();
        StateBus.getInstance().setState('map/zoom', zoom);
      }
    });
    this.mapView.$element.css('position', 'absolute');
    this.mapView.addStyleClass('row-full col-full');
    this.addSubview(this.mapView, 'base');
  }

  _initTiles() {
    this._initCounterTile();
    this._initSpeedTile();
  }

  _initMapLayerCheckbox() {
    const checkbox = new Checkbox('congestionCheckboxTile');
    checkbox.addStyleClass('left-13 col-4 top-3 row-1');
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

    const busTableView = new BusTableView('bus-table-view');
    busPanel.setTableView(busTableView);

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

  run() {
    this.getSubview('floating-panel-container').initPanelContainer();
  }
}
