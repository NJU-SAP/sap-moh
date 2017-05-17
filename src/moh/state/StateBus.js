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

    this.bindState('rt').attachChange(() => {
      if (this.getState('rt')) {
        this._updateTimestamp();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      }
    });
  }

  _updateTimestamp() {
    if (!this.getState('rt')) return;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.setState('timestamp', new Date());
    this.timer = setTimeout(this._updateTimestamp.bind(this), this.getState('kaaba') ? 3 * 1000 : 30 * 1000);
  }

  getInitialState() {
    return {
      kaaba: false,
      selectedStationId: null,
      timestamp: new Date(),
      rt: true
    };
  }
}
