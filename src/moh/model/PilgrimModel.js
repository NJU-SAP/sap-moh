import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';

import PilgrimServiceClient from '../service/PilgrimServiceClient';


export default class PilgrimModel extends Model {
  constructor() {
    super();

    StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
    StateBus.getInstance().bindState('kaaba').attachChange(() => {
      const kaaba = StateBus.getInstance().getState('kaaba');
      if (kaaba) {
        this.checkStates();
      }
    });
  }

  async checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    await this.updateHeatmap(timestamp);
  }

  _onStateChange() {
    if (StateBus.getInstance().getState('kaaba')) {
      // Active only in Kaaba mode
      this.checkStates();
    }
  }

  async updateHeatmap(timestamp) {
    const heatmap = await PilgrimServiceClient.getInstance().getHeatmap(timestamp);
    this.setProperty('/heatmap', heatmap);
  }
}
