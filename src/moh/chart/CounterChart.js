import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class CounterChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 20, right: 20, top: 0, bottom: 20 } },
      rtCount: { type: 'object' },
      predictedCount: { type: 'object' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-counter-chart');
    const now = new Date();
    const from = new Date(now.getYear(), now.getMonth(), now.getDate());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate() + 1);
    this.domainX = [from, to];
    this.domainY = [0, 60000];
  }

  initChart() {
    super.initChart();
    this._initRtSeries();
    this._initAreaSeries();
  }

  _initAxisX() {
    const hourFormat = d3.time.format("%-H");
    super._initAxisX({
      scaleType: d3.time.scale(),
      ticks: 8,
      domain: this.domainX,
      tickFormat: (date, i) => {
        return 3 * i;
      }
    });
  }

  _initAxisY() {
    super._initAxisY({
      domain: this.domainY,
      ticks: 3,
      tickFormat: (num) => {
        if (num === 0) {
          return '';
        }
        return num / 10000;
      }
    });
  }

  _initRtSeries() {
    this.rtSeries = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'pilgrimCount'
    });
    this.addSeries(this.rtSeries);
  }

  _initAreaSeries() {
    this.areaSeries = new AreaSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      y1Path: 'pilgrimCount',
      fillColor: 'steelBlue',
      opacity: 0.8
    });
    this.addSeries(this.areaSeries);
  }

  setData(value) {
    this.setProperty('data', value);
    if (value) {
      const from = this.domainX[0];
      const pilgrims = value.map((item, i) => {
        const date = new Date(from.getTime() + i * 60 * 1000);
        return {
          date,
          pilgrimCount: item.pilgrimCount
        };
      });
      this.rtSeries.setData(pilgrims);
      this.areaSeries.setData(pilgrims);
    }
    this.redraw();
  }

  redraw() {
    super.redraw();
    this.axisY.setInnerTickSize(-this.contentFrame.width);
  }
}
