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
import NowMenuItem from '../menu/NowMenuItem';
import PilgrimModel from '../model/PilgrimModel';
import PlayButtonView from '../view/PlayButtonView';
import SendMessageDialog from '../dialog/SendMessageDialog';
import SpeedTile from '../tile/SpeedTile';
import SwitchButtonView from '../view/SwitchButtonView';
import TrafficModel from '../model/TrafficModel';


export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');

    this._primaryMapView = null;

    this._initStateBus();
    this._initModels();
    this._initDataClockView();
    this._initMapView();
    this._initDistrictMapView();
    //this._initSwitchButtonView();
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

    StateBus.getInstance().bindState('district').attachChange(() => {
      const district = StateBus.getInstance().getState('district');
      const replace = district ? this.districtMapView : this.mapView;
      const replaced = !district ? this.districtMapView : this.mapView;

      this._primaryMapView = replace;

      this.removeSubview(replace);
      this.removeSubview(replaced);

      replace.$element.removeClass('top-2 right-2 row-5 col-6');
      replace.$element.removeClass('pocket');
      replace.$element.addClass('row-full col-full');
      this.addSubview(replace, 'base');
      replace.invalidateSize();
      replace.setZoom(replace.getNormalZoom());

      replaced.$element.removeClass('row-full col-full');
      replaced.$element.addClass('top-2 right-2 row-5 col-6');
      replaced.$element.addClass('pocket');
      this.addSubview(replaced, 'tile');
      replaced.invalidateSize();
      replaced.setZoom(replaced.getPocketZoom());
    });

    StateBus.getInstance().bindState('playing').attachChange(() => {
      const playing = StateBus.getInstance().getState('playing');
      if (this.playButton) {
        this.playButton.setPlaying(playing);
      }
      if (this.playbackTimer) {
        clearInterval(this.playbackTimer);
        this.playbackTimer = null;
      }
      if (playing) {
        if (
          StateBus.getInstance().getState('rt') ||
          (
            !StateBus.getInstance().getState('rt') &&
            Math.abs(StateBus.getInstance().getState('timestamp') - this.historyChart.axisX.getDomain()[1]) <= 300 * 1000
          )
        ) {
          this.setTimestamp(this.historyChart.axisX.getDomain()[0]);
        }
        this.playbackTimer = setInterval(this.playNextFrame.bind(this), 2000);
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

    const nowMenuItem = new NowMenuItem({
      id: 'nowMenuItem',
      text: 'Now',
      rt: '{state>/rt}',
      press: () => {
        const rt = StateBus.getInstance().getState('rt');
        if (!rt) {
          StateBus.getInstance().setState('playing', false);
          this.resumeRt();
          if (this.historyChart) {
            this.historyChart.setSelectedTimestamp(null);
          }
          if (this.futureChart) {
            this.futureChart.setSelectedTimestamp(null);
          }
        }
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
            timestampSelected: () => {
              if (this.futureChart) {
                this.futureChart.setSelectedTimestamp(null);
              }
              this.setTimestamp(this.historyChart.getSelectedTimestamp());
            }
          });
          historyMenuItem.addSubview(this.historyChart);
          this.historyChart.invalidateSize();
        }
        if (!this.playButton) {
          this.playButton = new PlayButtonView({
            id: 'playButton',
            click: () => {
              if (this.playButton.getPlaying()) {
                this.playButton.setPlaying(false);
              } else {
                this.playButton.setPlaying(true);
              }
              StateBus.getInstance().setState('playing', this.playButton.getPlaying());
            }
          });
          historyMenuItem.addSubview(this.playButton);
        }
        this.historyChart.setData(sap.ui.getCore().getModel('index').getProperty('/rt'));
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
            data: '{index>/predict}',
            timestampSelected: () => {
              if (this.historyChart) {
                this.historyChart.setSelectedTimestamp(null);
              }
              StateBus.getInstance().setState('playing', false);
              this.setTimestamp(this.futureChart.getSelectedTimestamp());
            }
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
        this._primaryMapView.zoomIn();
      }
    });

    const zoomOutMenuItem = new MenuItem({
      id: 'zoomOutMenuItem',
      text: '-',
      press: () => {
        this._primaryMapView.zoomOut();
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
    this._primaryMapView = this.mapView;

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

    const mapViewSwitchBtn = new SwitchButtonView('mapViewSwitchBtn', {
      district: '{state>/district}',
      btnClick: () => {
        StateBus.getInstance().setState('district', false);
      }
    });
    this.mapView.addSubview(mapViewSwitchBtn);
  }

  _initDistrictMapView() {
    this.districtMapView = new DistrictMapView('districtMapView');
    this.districtMapView.$element.addClass('top-2 right-2 row-5 col-6 pocket');
    this.districtMapView.$element.css('position', 'absolute');
    this.addSubview(this.districtMapView, 'tile');

    const districtSwitchBtn = new SwitchButtonView('districtSwitchBtn', {
      district: '{state>/district}',
      btnClick: () => {
        StateBus.getInstance().setState('district', true);
      }
    });
    this.districtMapView.addSubview(districtSwitchBtn);
  }

  _initSwitchButtonView() {
    this.switchButtonView = new SwitchButtonView('switchButtonView', {
      btnClick: () => {
        const district = StateBus.getInstance().getState('district');
        console.log(district, !district);
        StateBus.getInstance().setState('district', !district);
      }
    });
    this.switchButtonView.$element.addClass('right-2 top-4');
    this.addSubview(this.switchButtonView, 'tile');
  }

  _initTiles() {
    this.$('#bd-tile-layer').append($('<div class="shadow top-1 right-1 bottom-1 col-5">'));
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
    tile.addStyleClass('right-1 bottom-1');
    tile.setModel(sap.ui.getCore().getModel('index'), 'index');
    tile.setModel(sap.ui.getCore().getModel('config'), 'config');
    this.addSubview(tile, 'tile');
  }

  _initSpeedTile() {
    const tile = new SpeedTile({
      predict: '{index>/predict}',
      rt: '{index>/rt}'
    });
    tile.addStyleClass('right-1 bottom-4');
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
        this.getBusDetailDialog().tabView.selectTabPage(1);
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
  }

  setTimestamp(timestamp) {
    StateBus.getInstance().setState('rt', false);
    StateBus.getInstance().setState('timestamp', timestamp);
  }

  resumeRt() {
    StateBus.getInstance().setState('rt', true);
  }

  playNextFrame() {
    let timestamp = StateBus.getInstance().getState('timestamp');
    timestamp = new Date(timestamp.getTime() + 300 * 1000);
    if (timestamp.getTime() >= this.historyChart.axisX.getDomain()[1].getTime()) {
      StateBus.getInstance().setState('playing', false);
    } else {
      this.historyChart.setSelectedTimestamp(timestamp);
      this.setTimestamp(timestamp);
    }
  }
}
