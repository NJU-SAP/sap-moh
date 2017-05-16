import TabView from 'bd/view/TabView';

import BusOperationTabPageView from './BusOperationTabPageView';
import BusGroupingTabPageView from './BusGroupingTabPageView';
import BusDriverTabPageView from './BusDriverTabPageView';


export default class BusDetailTabView extends TabView {
  metadata = {
    events: {
      sendMessage: {}
    }
  }

  init() {
    super.init();

    this._initPages();
  }

  _initPages() {
    this.addPage(new BusOperationTabPageView('busOperationTabPage'));
    const busGroupingTabPageView = new BusGroupingTabPageView('busGroupingTabPageView');
    busGroupingTabPageView.attachSendMessage(() => {
      this.fireSendMessage();
    });
    this.addPage(busGroupingTabPageView);
    this.addPage(new BusDriverTabPageView('busDriverTabPageView'));
  }
}
