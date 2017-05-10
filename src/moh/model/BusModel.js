import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';

import BusServiceClient from '../service/BusServiceClient';


export default class BusModel extends Model {
  constructor() {
    super();

    StateBus.getInstance().bindState('selectedStationId').attachChange(this._onStateChange.bind(this));
    StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
  }

  checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    this.updateArrivals();
    this.updateBusRt(timestamp);
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateArrivals() {
    const selectedStationId = StateBus.getInstance().getState('selectedStationId');
    if (selectedStationId) {
      const arrivals = await BusServiceClient.getInstance().getArrivals(selectedStationId);
      this.setProperty('/arrivals', arrivals);
    } else {
      this.setProperty('/arrivals', []);
    }
  }

  async updateBusRt(timestamp) {
    const busRt = await BusServiceClient.getInstance().getRt(timestamp);
    this.setProperty('/rt', busRt);
  }
}
