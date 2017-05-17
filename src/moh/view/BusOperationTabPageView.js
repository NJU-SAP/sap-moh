import TabPageView from 'bd/view/TabPageView';


export default class BusOperationTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Speed' }
    }
  }

  init() {
    super.init();

    this.addStyleClass('moh-bus-operation-tab-page');

    this._initMain();
  }

  _initMain() {
    this.$container.html(`
      <div class="left-container">
        <div class="speed-container">
          <h2>Avg. Speed</h2>
          <div>
            <h2 class="value"></h2>
            <span class="unit">km/h</span>
          </div>
        </div>
        <div class="sunburst-chart-container">
          Sunburst Chart
        </div>
      </div>
      <div class="right-container">
        <div class="chart-container">
          Chart 1
        </div>
        <div class="chart-container">
          Chart 2
        </div>
      </div>
    `);
  }

  update() {
    const index = sap.ui.getCore().getModel('index').getProperty('/rt');
    this.$('.speed-container .value').text(index[index.length - 2].busSpeed);
  }
}
