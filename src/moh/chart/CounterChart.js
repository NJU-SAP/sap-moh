import XYAxisChart from 'nju/chart/XYAxisChart';
import LineSeries from 'nju/chart/series/LineSeries';

export default class CounterChart extends XYAxisChart {
  init() {
    super.init();
    this.addStyleClass('moh-counter-chart');
  }

  initChart() {
    super.initChart();
    this._initSeries();
  }

  _initAxisX() {
    super._initAxisX({
      ticks: 8
    });
  }

  _initAxisY() {
    super._initAxisY();
  }

  _initSeries() {

  }
}
