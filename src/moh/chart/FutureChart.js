import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class FutureChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 30, right: 20, top: 20, bottom: 10 } },
      data: { type: 'object' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-future-chart');
    const now = new Date();
    const from = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
    this.domainX = [from, to];
  }

  initChart() {
    super.initchart();
    this._initLineSeries();
  }

  _initAxisX() {
    const hourFormat = d3.time.format("%H:%M");
    super._initAxisX({
      scaleType: d3.time.scale(),
      ticks: 3,
      domain: this.domainX,
      tickFormat: date => {
        return hourFormat(date);
      }
    });
  }

  _initAxisY() {
    super._initAxisY({
      domain: [0, 50],
      tickValues: [0, 25, 50],
      tickFormat: (num) => {
        return num === 0 ? '' : num;
      }
    });
  }

  _initLineSeries() {

  }

  setData(value) {
    this.setProperty('data', value);
  }

  redraw() {
    this.axisY.setInnerTickSize(-this.contentFrame.width);
    this.axisX.setOuterTickSize(-this.contentFrame.height);

    super.redraw();
  }

  refresh() {

  }
}
