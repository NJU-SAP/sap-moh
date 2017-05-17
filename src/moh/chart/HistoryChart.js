import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class HistoryChart extends XYAxisChart {
  metadata = {
    properties: {
      data: { type: 'object', bindable: true },
      padding: { type: 'object', defaultValue: { left: 20, right: 20, top: 20, bottom: 5 } },
      selectedTimestamp: { type: 'object', defaultValue: null }
    },
    events: {
      timestampSelected: { }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-history-chart');
    this.domainY = [0, 60];
    this.invalidateDomainX();
  }

  initChart() {
    super.initChart();
    this._initBusLineSeries();
    this._initCityLineSeries();
    const self = this;
    this.contentGroup.on('click', function(d) {
      self.onClick.call(self, this);
    })
  }

  _initAxisX() {
    const hourFormat = d3.time.format("%H:%M");
    super._initAxisX({
      scaleType: d3.time.scale(),
      ticks: 8,
      domain: this.domainX,
      tickFormat: date => {
        return hourFormat(date);
      }
    });
  }

  _initAxisY() {
    super._initAxisY({
      domain: this.domainY,
      tickValues: [0, 20, 40, 60],
      tickFormat: (num) => {
        return num === 0 ? '' : num;
      }
    });
  }

  _initCityLineSeries() {
    this.cityLineSeries = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'value'
    });
    this.addSeries(this.cityLineSeries);
  }

  _initBusLineSeries() {
    this.busLineSeries = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'value',
      dashed: true
    });
    this.addSeries(this.busLineSeries);
  }

  setData(value) {
    this.setProperty('data', value);
    if (value) {
      this.invalidateDomainX();
    }
  }

  redraw() {
    if (!this.contentFrame) {
      return;
    }
    const newScale = this.busLineSeries.getScaleX().domain(this.domainX);

    this.axisY.setInnerTickSize(-this.contentFrame.width);
    this.axisX.setOuterTickSize(-this.contentFrame.height);
    this.axisX.setDomain(this.domainX);
    this.busLineSeries.setScaleX(newScale);
    this.cityLineSeries.setScaleX(newScale);
    super.redraw();
  }

  invalidateDomainX() {
    const now = new Date();
    const beginOfDay = new Date(now.getYear(), now.getMonth(), now.getDate());
    const from = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours() - 8, now.getMinutes());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
    this.domainX = [from, to];

    const value = this.getData();
    if (!value) return;
    const transformed = value.map((item, i) => ({
      date: new Date(beginOfDay.getTime() + i * 60 * 1000),
      busSpeed: item.busSpeed,
      overallSpeed: item.overallSpeed
    })).filter(item => item.date >= from && item.date <= to);
    this.busLineSeries.setData(transformed.map(item => ({ date: item.date, value: item.busSpeed })));
    this.cityLineSeries.setData(transformed.map(item => ({ date: item.date, value: item.overallSpeed })));

    this.redraw();
  }

  onClick(container) {
    const coordinates = d3.mouse(container);
    const timestamp = this.busLineSeries.getScaleX().invert(coordinates[0]);
    this.setSelectedTimestamp(timestamp);
    this.fireTimestampSelected();
  }
}
