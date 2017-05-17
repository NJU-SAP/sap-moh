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
    this.domainY = [0, 50];
    this.invalidateDomainX();
  }

  initChart() {
    super.initChart();
    this._initBusLineSeries();
    this._initCityLineSeries();
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
      domain: this.domainY,
      tickValues: [0, 25, 50],
      tickFormat: (num) => {
        return num === 0 ? '' : num;
      }
    });
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

  _initCityLineSeries() {
    this.cityLineSeries = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'value',
      dashed: true
    });
    this.addSeries(this.cityLineSeries);
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
    const from = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
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
}
