import Model from 'nju/model/Model';
import StateBus from 'nju/state/StateBus';

import IndexServiceClient from '../service/IndexServiceClient';


export default class IndexModel extends Model {
  constructor() {
    super();

    StateBus.getInstance().bindState('timestamp').attachChange(this._onStateChange.bind(this));
  }

  async initialLoad() {
    await this.checkStates();
    await this.loadPredict();
    this.fireEvent('initialLoadCompleted');
  }


  async checkStates() {
    const timestamp = StateBus.getInstance().getState('timestamp');

    await this.updateRT(timestamp);
  }

  async loadPredict() {
    const timestampDate = new Date();
    const from = new Date(`${timestampDate.getFullYear()}-${timestampDate.getMonth() + 1}-${timestampDate.getDate()} 00:00`);
    const to = new Date(`${timestampDate.getFullYear()}-${timestampDate.getMonth() + 1}-${timestampDate.getDate()} 23:59`);

    const predict = await IndexServiceClient.getInstance().getPredict(from, to);
    this.setProperty('/predict', predict);
  }

  _onStateChange() {
    this.checkStates();
  }

  async updateRT(timestamp) {
    const timestampDate = new Date(timestamp);
    const from = new Date(`${timestampDate.getFullYear()}-${timestampDate.getMonth() + 1}-${timestampDate.getDate()} 00:00`);
    const to = timestampDate;

    const rt = await IndexServiceClient.getInstance().getRt(from, to);
    this.setProperty('/rt', rt);

    //const districtRt = await IndexServiceClient.getInstance().getDistrictRt(to);
    //this.setProperty('/district/rt', districtRt);
  }
}
