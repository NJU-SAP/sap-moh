import View from 'nju/view/View';

export default class Tile extends View {
  metadata = {
    properties: {
      title: { type: 'string' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('bd-tile');
  }
}
