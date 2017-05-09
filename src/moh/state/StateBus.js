import SuperStateBus from 'nju/state/StateBus';


export default class StateBus extends SuperStateBus {
  afterInit() {
    super.afterInit();

    this._updateTimestamp();
  }

  _updateTimestamp() {
    this.setState('timestamp', new Date());
    setTimeout(this._updateTimestamp.bind(this), 10 * 1000);
  }

  getInitialState() {
    return {
      timestamp: new Date()
    };
  }
}
