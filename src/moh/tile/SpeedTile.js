import StandardTile from 'bd/tile/StandardTile';
import XYAxisChart from 'nju/chart/XYAxisChart';

export default class SpeedTile extends StandardTile {
  metadata = {
    properties: {
      rt: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle1('Speed(Whole City)');
    this.setTitle2('Speed(Buses)');
    this.setUnit('Km/h');
    this.setValueFormat('.0');
    this.initSpeedChart();
    // this.bindSpeedIndex({
    //   model: 'index',
    //   path: '/cityIndex'
    // });
  }

  initSpeedChart() {
    this.speedChart = new XYAxisChart();
    this.addSubview(this.speedChart);
  }

  setRt(value) {
    this.setProperty('rt', value);
    if (value && value.length) {
      const record = value[value.length - 1];
      this.setValue1(record.busSpeed);
      this.setValue2(record.busSpeed);
    }
  }
}
