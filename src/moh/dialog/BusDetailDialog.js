import StateBus from 'nju/state/StateBus';

import Dialog from 'bd/dialog/Dialog';
import BusDetailTabView from '../view/BusDetailTabView';


export default class BusDetailDialog extends Dialog {
  metadata = {
    events: {
      sendMessage: {},
      putAside: {}
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-bus-detail-dialog col-9 row-7 top-3');
    this._initTabView();
  }

  _initTabView() {
    this.tabView = new BusDetailTabView();
    this.tabView.attachSendMessage(() => {
      this.fireSendMessage();
    });
    this.tabView.attachGroupingLocation(() => {
      this.firePutAside();
    });
    this.addSubview(this.tabView, this.$('>.container >main'));
  }

  activate() {
    super.activate();
    this.setTitle(`Bus ${StateBus.getInstance().getState('selectedBusId')}RUA`);
    this.tabView.update();
  }
}
