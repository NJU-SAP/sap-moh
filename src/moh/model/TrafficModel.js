import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';


import TrafficServiceClient from '../service/TrafficServiceClient';

export default class TrafficModel extends Model {
  constructor() {
    super();

    StateBus.getInstance().attachReady(async () => {
      StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
    });
  }

  async initialLoad() {
    await this.checkStates();
    this.fireEvent('initialLoadCompleted');
  }

  async checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');
    await this.updateEdgeSpeed(timestamp);
    this.fireEvent('initialLoadCompleted');
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateEdgeSpeed(timestamp) {
    const edgeSpeed = await TrafficServiceClient.getInstance().getEdgeSpeed(timestamp);
    this.setProperty('/edge-speed', edgeSpeed);
  }
}
