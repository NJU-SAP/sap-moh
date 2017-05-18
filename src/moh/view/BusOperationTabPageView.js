import TabPageView from 'bd/view/TabPageView';

import SpeedChart from '../chart/SpeedChart';

export default class BusOperationTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Operation' },
      rt: { type: 'object' }
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
          Bar Chart
        </div>
        <div class="speed-chart-container"></div>
      </div>
    `);
    this._initSpeedChart();
  }

  _initSpeedChart() {
    this.speedChart = new SpeedChart('speedChart', {
      rtCount: '{index/}'
    });
    this.addSubview(this.speedChart, this.$('.speed-chart-container'));
  }

  setRt(value) {
    this.setProperty('rt', value);
    this.$('.speed-container .value').text(value[value.length - 2].busSpeed);
    if (this.speedChart) {
      this.speedChart.invalidateSize();
      this.speedChart.setRtCount(value.map(item => item.busSpeed));
    }
  }

  update() {
    const rt = sap.ui.getCore().getModel('index').getProperty('/rt');
    this.setRt(rt);
  }

}
