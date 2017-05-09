import Model from 'nju/model/Model';


export default class TrafficModel extends Model {
  constructor(props = {}) {
    super(props);
    this._init();
  }

  async _init() {
    this._speedOfEdges = {
      102010: 50,
      102011: 50
    };
  }
}
