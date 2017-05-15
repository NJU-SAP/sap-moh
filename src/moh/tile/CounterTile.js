import StandardTile from 'bd/tile/StandardTile';
import CounterChart from '../chart/CounterChart';

export default class CounterTile extends StandardTile {
  metadata = {
    properties: {
      predict: { type: 'object', bindable: true },
      rt: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle1('Pilgrims');
    this.setTitle2('Buses');
    this.setUnit('');
    this.setValueFormat('#,###');
    this.attachEventOnce('addedToParent', () => {
      this.initChart();
    });
  }

  setRt(value) {
    this.setProperty('rt', value);
    if (value && value.length) {
      const record = value[value.length - 1];
      this.setValue1(record.pilgrimCount);
      this.setValue2(record.busCount);
    }
    if (this.chart) {
      this.chart.setData(value);
    }
  }

  setPredict(value) {
    this.setProperty('predict', value);
  }

  initChart() {
    this.chart = new CounterChart();
    this.addSubview(this.chart);
  }

  titleSelected(index) {

  }
}
