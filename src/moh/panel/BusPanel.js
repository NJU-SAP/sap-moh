import Panel from 'bd/panel/Panel';

export default class BusPanel extends Panel {
  metadata = {
    properties: {
      stationId: { type: 'any', bindable: true }
    },
    aggregations: {
      tableView: { type: 'moh.view.BusTableView', multiple: false }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-bus-panel');

    this._initHeader();
    this._initMain();
  }

  _initHeader() {
    this.$header = $('<header><div class="title h3"/><div class="title h4"/></header>');
    this.$header.children('.title.h4').text('Arriving Bus / Coach');
    this.$element.append(this.$header);
  }

  _initMain() {
    this.$container = $('<main/>');
    this.$element.append(this.$container);
  }

  setTableView(tableView) {
    this.setAggregation('tableView', tableView);
    this.$container.append(tableView.$element);
  }

  setStationId(stationId) {
    if (stationId) {
      this.setProperty('stationId', stationId);
      const station = sap.ui.getCore().getModel('gis').getStation(stationId);
      console.log(station);
      this.$header.children('.title.h3').text(station.name);
    }
  }
}
