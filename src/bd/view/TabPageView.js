import View from 'nju/view/View';


export default class TabPageView extends View {
  metadata = {
    properties: {
      title: { type: 'string' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('tab-page-view');
  }
}
