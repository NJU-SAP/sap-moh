import StateBus from 'nju/state/StateBus';

import Dialog from 'bd/dialog/Dialog';

//import '../res/bus-detail-dialog.less';


export default class BusDetailDialog extends Dialog {
  init() {
    super.init();
    this.addStyleClass('moh-bus-detail-dialog col-9 row-7 top-3');
  }
}
