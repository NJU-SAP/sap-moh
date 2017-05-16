import SuperStateBus from 'nju/state/StateBus';


export default class StateBus extends SuperStateBus {
  afterInit() {
    super.afterInit();

    this._updateTimestamp();

    this.bindState('kaaba').attachChange(() => {
      if (this.getState('kaaba')) {
        this._updateTimestamp();
      }
    });
  }

  _updateTimestamp() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.setState('timestamp', new Date());
    this.timer = setTimeout(this._updateTimestamp.bind(this), this.getState('kaaba') ? 5 * 1000 : 30 * 1000);
  }

  getInitialState() {
    return {
      kaaba: false,
      selectedStationId: null,
      timestamp: new Date()
    };
  }
}
