import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';


import TrafficServiceClient from '../service/TrafficServiceClient';

export default class TrafficModel extends Model {
  constructor(props = {}) {
    super(props);

    StateBus.getInstance().attachReady(() => {
      StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
      this.checkStates();
    });
  }

  checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    this.updateEdgeSpeed(timestamp);
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateEdgeSpeed(timestamp) {
    const edgeSpeed = await TrafficServiceClient.getInstance().getEdgeSpeed(timestamp);
    this.setProperty('/edge-speed', edgeSpeed);
  }
}
