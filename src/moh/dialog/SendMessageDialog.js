import StateBus from 'nju/state/StateBus';

import View from 'nju/view/View';


export default class SendMessageDialog extends View {
  init() {
    super.init();
    this.addStyleClass('moh-send-message-dialog col-6 row-5 top-4');
    // this.$element.css({
    //   backgroundImage: 'url(./res/imgs/popup-reschedule-sending.png)'
    // });

    this._initDialog();
  }

  _initDialog() {
  }
}
