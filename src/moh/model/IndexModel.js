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
    // this.setProperty('/rt', data);
  }

  _onStateChange() {
    this.checkStates();
  }
}
