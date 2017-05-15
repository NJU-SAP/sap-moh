import TabView from 'bd/view/TabView';

import BusOperationTabPageView from './BusOperationTabPageView';
import BusGroupingTabPageView from './BusGroupingTabPageView';
import BusDriverTabPageView from './BusDriverTabPageView';


export default class BusDetailTabView extends TabView {
  init() {
    super.init();

    this._initPages();
  }

  _initPages() {
    this.addPage(new BusOperationTabPageView('busOperationTabPage'));
    this.addPage(new BusGroupingTabPageView('busGroupingTabPageView'));
    this.addPage(new BusDriverTabPageView('busDriverTabPageView'));
  }
}
