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
    this.setSelectedTitle('Pilgrims');
    this.setUnit('');
    this.setValueFormat('#,###');
    this.attachEventOnce('addedToParent', () => {
      this.initChart();
    });
  }

  setRt(value) {
    this.setProperty('rt', value);
    if (value && value.length) {
      const lastRecord = value[value.length - 1];
      this.setValue1(lastRecord.pilgrimCount);
      this.setValue2(lastRecord.busCount);
    }
    if (this.chart) {
      const path = this.getSelectedTitle() === 'Pilgrims' ? 'pilgrimCount' : 'busCount';
      this.chart.setRtCount(value.map(item => item[path]));
    }
  }

  setPredict(value) {
    this.setProperty('predict', value);
    if (this.chart) {
      const path = this.getSelectedTitle() === 'Pilgrims' ? 'pilgrimCount' : 'busCount';
      this.chart.setPredictCount(value.map(item => item[path]));
    }
  }

  initChart() {
    this.chart = new CounterChart();
    this.addSubview(this.chart);
  }

  setSelectedTitle(value) {
    this.setProperty('selectedTitle', value);
    this.setRt(this.getRt());
    this.setPredict(this.getPredict());
  }
}
