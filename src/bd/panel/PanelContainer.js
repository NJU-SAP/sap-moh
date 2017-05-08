import View from 'nju/view/View';

export default class PanelContainer extends View {
  metadata = {
    aggregations: {
      panels: { type: 'bd.panel.Panel' }
    },

    events: {
      onSelectionChanged: {

      }
    }
  }

  init() {
    super.init();
    this.addStyleClass('bd-panel-container col-4 left-1 top-3 bottom-1');
  }
}
