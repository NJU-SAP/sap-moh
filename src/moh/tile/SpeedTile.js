import StandardTile from 'bd/tile/StandardTile';


export default class SpeedTile extends StandardTile {
  metadata = {
    properties: {
      speedIndex: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle('Speed');
    this.setDescription('Overall');
    this.setUnit('Km/h');
    this.setValueFormat('.0');
    // this.bindSpeedIndex({
    //   model: 'index',
    //   path: '/cityIndex'
    // });
    // this.attachEventOnce('addedToParent', () => {
    //   self._initChart();
    // });
  }
}
