import Panel from 'bd/panel/Panel';

export default class BusPanel extends Panel {
  metadata = {
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
    this.$header = $('<header><div class="title h3"/></header>');
    this.$header.children('.title').text('Arriving Bus / Coach');
    this.$element.append(this.$header);
  }

  _initMain() {
    this.$container = $('<main/>');
    this.$element.append(this.$container);
    //this.$container.perfectScrollbar();
  }

  setTableView(tableView) {
    this.setAggregation('tableView', tableView);
    this.$container.append(tableView.$element);
  }
}
