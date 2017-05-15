import StateBus from 'nju/state/StateBus';

import Dialog from 'bd/dialog/Dailog';

import '../res/bus-detail-dialog.less';


export default class BusDetailDialog extends Dialog {
  init() {
    super.init();
    this.addStyleClass('moh-bus-detail-dialog');
  }
}
