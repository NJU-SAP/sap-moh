import StateBus from 'nju/state/StateBus';

import Dialog from 'bd/dialog/Dailog';

import '../res/bus-detail-dialog.less';


export default class BusDetailDialog extends Dialog {
  init() {
    super.init();
    this.addStyleClass('moh-bus-detail-dialog col-9 row-7 top-3');

    this._initTitle();
  }

  _initTitle() {
    this._$direction = $("<span class='fa fa-arrow-up direction h2'/>");
    this.$title.append(this._$direction);
  }
}
