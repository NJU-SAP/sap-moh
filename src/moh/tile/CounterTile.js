import StandardTile from 'bd/tile/StandardTile';


export default class CounterTile extends StandardTile {
  metadata = {
    properties: {
      speedIndex: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();
    this.setTitle('Pilgrims / Buses');
    this.setDescription('');
    this.setUnit('');
    this.setValueFormat('0');
    // this.bindSpeedIndex({
    //   model: 'index',
    //   path: '/cityIndex'
    // });
    // this.attachEventOnce('addedToParent', () => {
    //   self._initChart();
    // });
  }
}
