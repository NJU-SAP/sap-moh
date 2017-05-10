import View from 'nju/view/View';

export default class TableView extends View {
  metadata = {
    properties: {
      rows: { type: 'object' }
    }
  }

  init() {
    super.init();
    this.rowSet = {};
  }

  getElementTag() {
    return 'ul';
  }

  initRows() {

  }
}
