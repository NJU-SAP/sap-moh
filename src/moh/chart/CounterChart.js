import XYAxisChart from 'nju/chart/XYAxisChart';
import LineSeries from 'nju/chart/series/LineSeries';

export default class CounterChart extends XYAxisChart {
  init() {
    super.init();
    this.addStyleClass('moh-counter-chart');
  }

  initChart() {
    super.initChart();
    this._initAxisX();
    this._initSeries();
  }

  _initAxisX()
  {
    super._initAxisX({
      domain: [1, 100],
      scaleType: d3.time.scale(),
      ticks: 8
    });
  }

  _initAxisY() {
    super._initAxisY();
  }

  _initSeries() {

  }
}
