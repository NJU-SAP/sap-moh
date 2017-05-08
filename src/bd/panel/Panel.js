import View from 'nju/view/View';

export default class Panel extends View {
  metadata = {
    properties: {
      icon: { type: 'string' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('panel');
  }
}
