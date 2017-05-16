import StateBus from 'nju/state/StateBus';

import Dialog from 'bd/dialog/Dialog';


export default class SendMessageDialog extends Dialog {
  metadata = {
    events: {
      dialogClosed: {}
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-send-message-dialog col-6 row-5 top-5');

    this._initDialog();
  }

  _initiOctagon() { }

  _initContainer() { }

  _initDialog() {
    this.$element.append('<div id=line/><div id=plane/>');
    setTimeout(() => {
      this.$('#line').remove();
      this.$('#plane').remove();
      this.addStyleClass('sent');
      setTimeout(() => {
        this.closePopup();
      }, 1500);
    }, 2500);
  }
}
