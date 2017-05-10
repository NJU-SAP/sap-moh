import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';

import BusServiceClient from '../service/BusServiceClient';


export default class BusModel extends Model {
  constructor() {
    super();

    StateBus.getInstance().bindState('selectedStationId').attachChange(this._onStateChange.bind(this));
  }

  async _onStateChange() {
    const selectedStationId = StateBus.getInstance().getState('selectedStationId');
    if (selectedStationId) {
      const arrivals = await BusServiceClient.getInstance().getArrivals(selectedStationId);
      this.setProperty('/arrivals', arrivals);
    } else {
      this.setProperty('/arrivals', []);
    }
  }
}
