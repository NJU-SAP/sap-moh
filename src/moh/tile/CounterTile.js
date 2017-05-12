import StandardTile from 'bd/tile/StandardTile';
import CounterChart from '../chart/CounterChart';

export default class CounterTile extends StandardTile {
  metadata = {
    properties: {
      rt: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle1('Pilgrims');
    this.setTitle2('Buses');
    this.setUnit('');
    this.setValueFormat('0');
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

  initChart() {
    this.chart = new CounterChart();
    this.addSubview(this.chart);
  }
}
