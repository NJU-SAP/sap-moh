import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class HistoryChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 20, right: 20, top: 20, bottom: 10 } },
      data: { type: 'object' },
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-history-chart');
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
      yPath: 'value'
    });
    this.addSeries(this.busLineSeries);
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
    const from = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours() - 8, now.getMinutes());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes())
    this.domainX = [from, to];
    console.log(this.domainX);

    const value = this.getData();
    if (!value) return;
    const busSpeed = value.map((item, i) => ({
      date: new Date(from.getTime() + i * 60 * 1000),
      value: item.busSpeed
    })).filter(item => item.date >= from && item.date <= to);
    const overallSpeed = value.map((item, i) => ({
      date: new Date(from.getTime() + i * 60 * 1000),
      value: item.overallSpeed
    })).filter(item => item.date >= from && item.date <= to);
    this.busLineSeries.setData(busSpeed);
    this.cityLineSeries.setData(overallSpeed);

    this.redraw();
  }
}
