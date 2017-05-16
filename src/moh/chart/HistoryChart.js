import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class HistoryChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 0, right: 0, top: 0, bottom: 0 } },
      data: { type: 'object' },
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-history-chart');
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
    const from = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 15);
    this.domainX = [from, to];

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
