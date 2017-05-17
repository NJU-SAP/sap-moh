import StateBus from 'nju/state/StateBus';
import View from 'nju/view/View';

import Checkbox from 'bd/view/Checkbox';
import DataClockView from 'bd/view/DataClockView';
import ExpandableMenuItem from 'bd/menu/ExpandableMenuItem';
import MenuItem from 'bd/menu/MenuItem';
import SuperApplication from 'bd/app/Application';

import BusDetailDialog from '../dialog/BusDetailDialog';
import BusModel from '../model/BusModel';
import BusPanel from '../panel/BusPanel';
import BusTableView from '../view/BusTableView';
import CounterTile from '../tile/CounterTile';
import DistrictMapView from '../map/DistrictMapView';
import FloatingPanelContainer from '../panel/FloatingPanelContainer';
import FutureChart from '../chart/FutureChart';
import GisModel from '../model/GisModel';
import HistoryChart from '../chart/HistoryChart';
import IndexModel from '../model/IndexModel';
import MapView from '../map/MapView';
import MohStateBus from '../state/StateBus';
import PilgrimModel from '../model/PilgrimModel';
import SendMessageDialog from '../dialog/SendMessageDialog';
import SpeedTile from '../tile/SpeedTile';
import TrafficModel from '../model/TrafficModel';


export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');

    this._initStateBus();
    this._initModels();
    this._initDataClockView();
    this._initMapView();
    this._initDistrictMapView();
    this._initTiles();
    this._initMapLayerCheckbox();
    this._initFloatingPanelContainer();

    StateBus.getInstance().bindState('kaaba').attachChange(() => {
      const kaaba = StateBus.getInstance().getState('kaaba');
    });

    StateBus.getInstance().bindState('selectedBusId').attachChange(() => {
      const selectedBusId = StateBus.getInstance().getState('selectedBusId');
      if (selectedBusId !== null) {
        this.getBusDetailDialog().popup();
      }
    });
  }

  afterInit() {
    super.afterInit();
    setTimeout(() => {
      this.invalidateSize();
    });
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
    sap.ui.getCore().setModel(gisModel, 'gis');

    const busModel = new BusModel();
    this.setModel(busModel, 'bus');
    sap.ui.getCore().setModel(busModel, 'bus');

    const indexModel = new IndexModel();
    this.setModel(indexModel, 'index');
    sap.ui.getCore().setModel(indexModel, 'index');

    const trafficModel = new TrafficModel();
    this.setModel(trafficModel, 'traffic');
    sap.ui.getCore().setModel(trafficModel, 'traffic');

    const pilgrimModel = new PilgrimModel();
    this.setModel(pilgrimModel, 'pilgrim');
    sap.ui.getCore().setModel(pilgrimModel, 'pilgrim');
  }

  _initDataClockView() {
    const dataClockView = new DataClockView('dataClockView', {
      time: '{state>/timestamp}',
      rt: '{state>/rt}'
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

    const historyMenuItem = new ExpandableMenuItem({
      id: 'historyMenuItem',
      text: 'History',
      expandDirection: 'left',
      expandWidth: `${this.getEmSize(28)}px`,
      expanded: () => {
        if (!this.historyChart) {
          this.historyChart = new HistoryChart({
            id: 'historyChart',
            data: '{index>/rt}'
          });
          historyMenuItem.addSubview(this.historyChart);
          this.historyChart.invalidateSize();
        }
      }
    });

    const futureMenuItem = new ExpandableMenuItem({
      id: 'futureMenuItem',
      text: 'Future',
      expandDirection: 'right',
      expandWidth: `${this.getEmSize(12)}px`,
      expanded: () => {
        if (!this.futureChart) {
          this.futureChart = new FutureChart({
            id: 'futureChart',
            data: '{index>/predict}'
          });
          futureMenuItem.addSubview(this.futureChart);
          this.futureChart.invalidateSize();
        } else {
          this.futureChart.invalidateDomainX();
        }
      }
    });

    const kaabaMenuItem = new MenuItem({
      id: 'kaabaMenuItem',
      icon: 'mf mf-kaaba',
      press: () => {
        kaabaMenuItem.setActive(!kaabaMenuItem.getActive());
        StateBus.getInstance().setState('kaaba', kaabaMenuItem.getActive());
      }
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
      historyMenuItem,
      futureMenuItem,
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

    mainMenu.attachReset(() => {
      this.mapView.setCenterLocation(this.mapView.getDefaultCenterLocation(), this.mapView.getDefaultZoom());
    });
  }

  _initMapView() {
    this.mapView = new MapView('mapView', {
      kaaba: '{state>/kaaba}',
      kaabaGroup: '{state>/kaaba-group}',
      zoomChanged: () => {
        const zoom = this.mapView.getZoom();
        StateBus.getInstance().setState('map/zoom', zoom);
      }
    });

    this.mapView.attachStationChange((e) => {
      const id = e.getParameter('id');
      StateBus.getInstance().setState('selectedStationId', id);
      if (id === null) {
        this.getSubview('floating-panel-container').hidePanel();
      } else {
        this.getSubview('floating-panel-container').showPanel();
      }
    });
    this.mapView.attachBusChange((e) => {
      const id = e.getParameter('id');
      StateBus.getInstance().setState('selectedBusId', id);
    });

    this.mapView.$element.css('position', 'absolute');
    this.mapView.addStyleClass('row-full col-full');
    this.addSubview(this.mapView, 'base');
  }

  _initDistrictMapView() {
    this.districtMapView = new DistrictMapView('districtMapView');
    this.districtMapView.$element.addClass('top-2 right-2 row-5 col-6');
    this.districtMapView.$element.css('position', 'absolute');
    this.addSubview(this.districtMapView, 'tile');
  }

  _initTiles() {
    this.$('#bd-tile-layer').append($('<div class="shadow top-1 right-1 col-5 row-12">'));
    this._initCounterTile();
    this._initSpeedTile();
  }

  _initMapLayerCheckbox() {
    const checkbox = new Checkbox('congestionCheckboxTile', {
      statusChanged: (e) => {
        const visible = e.getParameter('status');
        this.mapView.setBusLineVisible(visible);
      }
    });
    checkbox.addStyleClass('left-14 col-3 top-5 row-1');
    this.addSubview(checkbox, 'tile');
  }

  _initCounterTile() {
    const tile = new CounterTile({
      predict: '{index>/predict}',
      rt: '{index>/rt}'
    });
    tile.addStyleClass('right-1 bottom-4');
    tile.setModel(sap.ui.getCore().getModel('index'), 'index');
    tile.setModel(sap.ui.getCore().getModel('config'), 'config');
    this.addSubview(tile, 'tile');
  }

  _initSpeedTile() {
    const tile = new SpeedTile({
      predict: '{index>/predict}',
      rt: '{index>/rt}'
    });
    tile.addStyleClass('right-1 bottom-1');
    tile.setModel(sap.ui.getCore().getModel('index'), 'index');
    tile.setModel(sap.ui.getCore().getModel('config'), 'config');
    this.addSubview(tile, 'tile');
  }

  _initFloatingPanelContainer() {
    const panelContainer = new FloatingPanelContainer('floating-panel-container');
    this.addSubview(panelContainer, 'floatingPanel');

    const busPanel = new BusPanel('bus-panel', {
      icon: 'mf mf-bus h3',
      stationId: '{state>/selectedStationId}'
    });
    panelContainer.addPanel(busPanel);

    const busTableView = new BusTableView('bus-table-view', {
      rows: '{bus>/arrivals}'
    });
    busPanel.setTableView(busTableView);
  }

  _initBusDetailDialog() {
    this._busDetailDialog = new BusDetailDialog('bus-dialog');
    this._busDetailDialog.attachSendMessage(() => {
      const sendMessageDialog = new SendMessageDialog('send-message');
      sendMessageDialog.attachDialogClosed(() => {
        this.getBusDetailDialog().popup();
      });
      this.closePopupDialog(() => {
        this.popupDialog(sendMessageDialog);
      });
    });
    this._busDetailDialog.attachPutAside(() => {
      this._busDetailDialog.putAside();
      setTimeout(() => {
        StateBus.getInstance().setState('kaaba', true);
        StateBus.getInstance().setState('kaaba-group', true);
      }, 500);
    });
    this._busDetailDialog.attachResume(() => {
      StateBus.getInstance().setState('kaaba', false);
      StateBus.getInstance().setState('kaaba-group', false);
    });
  }

  _initSendMessageDialog() {
    this._sendMessageDialog = new SendMessageDialog('send-message');
  }

  getBusDetailDialog() {
    if (!this._busDetailDialog) {
      this._initBusDetailDialog();
    }
    return this._busDetailDialog;
  }

  getSendMessageDialog() {
    if (!this._sendMessageDialog) {
      this._initSendMessageDialog();
    }
    return this._sendMessageDialog;
  }

  run() {
    //this.getSubview('floating-panel-container').initPanelContainer();
  }

  setTimestamp(timestamp) {
    StateBus.getInstance().setState('rt', false);
    StateBus.getInstance().setState('timestamp', timestamp);
  }

  resumeRt() {
    StateBus.getInstance().setState('rt', true);
  }
}
