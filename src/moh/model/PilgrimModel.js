import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';



export default class PilgrimModel extends Model {
  constructor() {
    super();

    //StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
  }

  async initialLoad() {
  }


  async checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    await this.updateHeatmap(timestamp);
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateHeatmap(timestamp) {

  }
}
