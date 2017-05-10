import StandardTile from 'bd/tile/StandardTile';
import XYAxisChart from 'nju/chart/XYAxisChart';

export default class SpeedTile extends StandardTile {
  metadata = {
    properties: {
      speedIndex: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle('Speed');
    this.setDescription('');
    this.setUnit('Km/h');
    this.setValueFormat('.0');
    this.initSpeedChart();
    // this.bindSpeedIndex({
    //   model: 'index',
    //   path: '/cityIndex'
    // });
    // this.attachEventOnce('addedToParent', () => {
    //   self._initChart();
    // });
  }

  initSpeedChart() {
    this.speedChart = new XYAxisChart();
    this.addSubview(this.speedChart);
  }
}
