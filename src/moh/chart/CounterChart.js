import XYAxisChart from 'nju/chart/XYAxisChart';
import LineSeries from 'nju/chart/series/LineSeries';

export default class CounterChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 20, right: 20, top: 0, bottom: 20 } },
      data: { type: 'object' }
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
    this._initSeries();
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

  _initSeries() {
    this.series = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'pilgrimCount'
    });
    this.addSeries(this.series);
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
      this.series.setData(pilgrims);
    }
    this.redraw();
  }

  redraw() {
    super.redraw();
    this.axisY.setInnerTickSize(-this.contentFrame.width);
  }
}
