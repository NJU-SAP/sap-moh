import View from 'nju/view/View';

export default class TableView extends View {
  metadata = {
    properties: {
      rows: { type: 'object' }
    }
  }
}
