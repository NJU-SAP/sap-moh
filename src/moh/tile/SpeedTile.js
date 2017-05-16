import StandardTile from 'bd/tile/StandardTile';
import SpeedChart from '../chart/SpeedChart';

export default class SpeedTile extends StandardTile {
  metadata = {
    properties: {
      predict: { type: 'object', bindable: true },
      rt: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle1('Speed(City)');
    this.setTitle2('Speed(Buses)');
    this.setSelectedTitle('Speed(Whole City)');
    this.setUnit('Km/h');
    this.attachEventOnce('addedToParent', () => {
      this.initChart();
    });
  }

  setRt(value) {
    this.setProperty('rt', value);
    if (value && value.length) {
      const lastRecord = value[value.length - 1];
      this.setValue1(lastRecord.overallSpeed);
      this.setValue2(lastRecord.busSpeed);
    }
    if (this.chart) {
      const path = this.getSelectedTitle().includes('Buses')  ? 'busSpeed' : 'overallSpeed';
      this.chart.setRtCount(value.map(item => item[path]));
    }
  }

  setPredict(value) {
    this.setProperty('predict', value);
    if (this.chart) {
      const path = this.getSelectedTitle().includes('Buses')  ? 'busSpeed' : 'overallSpeed';
      this.chart.setPredictCount(value.map(item => item[path]));
    }
  }

  initChart() {
    this.chart = new SpeedChart();
    this.addSubview(this.chart);
  }

  setSelectedTitle(value) {
    this.setProperty('selectedTitle', value);
    this.setRt(this.getRt());
    this.setPredict(this.getPredict());
  }
}
