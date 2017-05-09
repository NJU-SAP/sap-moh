import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';

import IndexServiceClient from '../service/IndexServiceClient';


export default class IndexModel extends Model {
  constructor(props = {}) {
    super(props);

    StateBus.getInstance().attachReady(() => {
      StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
      this.checkStates();
    });
  }

  checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    this.updateRT(timestamp);
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateRT(timestamp) {
    const timestampDate = new Date(timestamp);
    const from = new Date(`${timestampDate.getFullYear()}-${timestampDate.getMonth() + 1}-${timestampDate.getDate()} 00:00`);
    const to = timestampDate;

    const rt = await IndexServiceClient.getInstance().getRt(from, to);
    console.log(rt);
    this.setProperty('/rt', rt);
  }
}
