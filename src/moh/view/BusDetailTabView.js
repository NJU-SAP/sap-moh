import TabView from 'bd/view/TabView';

import BusOperationTabPageView from './BusOperationTabPageView';
import BusGroupingTabPageView from './BusGroupingTabPageView';
import BusDriverTabPageView from './BusDriverTabPageView';


export default class BusDetailTabView extends TabView {
  metadata = {
    events: {
      sendMessage: {},
      groupingLocation: {}
    }
  }

  init() {
    super.init();

    this.moveOutPage = null;
    this.moveInPage = null;

    this._selectedTabPage = null;

    this._initPages();
  }

  _initPages() {
    this._operationTabPage = new BusOperationTabPageView('busOperationTabPage', {
    });
    this.addPage(this._operationTabPage);
    const busGroupingTabPageView = new BusGroupingTabPageView('busGroupingTabPageView');
    busGroupingTabPageView.attachSendMessage(() => {
      this.fireSendMessage();
    });
    busGroupingTabPageView.attachGroupingLocation(() => {
      this.fireGroupingLocation();
    });
    this.addPage(busGroupingTabPageView);
    this.addPage(new BusDriverTabPageView('busDriverTabPageView'));
  }

  update() {
    this._operationTabPage.update();
  }

  selectTabPage(tabPageView, animation = true) {
    this._selectedTabPage = tabPageView;
    let page = null;
    if (!isNaN(tabPageView - 0)) {
      // num or string but can be transform to num
      const index = tabPageView - 0;
      page = this.getPages()[index] ? this.getPages()[index] : null;
    } else if (typeof (tabPageView) === 'string') {
      page = this.pageSet[tabPageView] ? this.pageSet[tabPageView] : null;
    } else if (tabPageView instanceof bd.view.TabPageView) {
      page = tabPageView;
    } else {
      throw new Error('Invalid type of view.');
    }

    if (this.selection === page) {
      return;
    }

    let $li = null;
    if (this.selection === null) {
      this.$container.append(page.$element);
      this.selection = page;
      $li = this.$element.find(`#${this.selection.getId()}`);
      $li.addClass('active');
    } else {
      if (this.animating) {
        return;
      }

      // Confirm move out page.
      this.moveInPage = page;
      this.moveOutPage = this.selection;
      this._movePage(this.moveInPage, this.moveOutPage, animation);
    }

    this.fireOnSelectionChanged();
  }

  _movePageOut(tabPageView, direction, animation = true) {
    if (animation) {
      let x = this.$container.width();
      if (direction === 'left') {
        x = -1 * x;
      }
      tabPageView.$element.transition({
        x,
        opacity: 0
      }, 300, 'easeOutCubic', () => {
        tabPageView.$element.detach();
      });
    } else {
      tabPageView.$element.detach();
    }
  }

  _movePageIn(tabPageView, direction, animation = true) {
    this.$container.append(tabPageView.$element);
    if (animation) {
      let x = this.$container.width();
      if (direction === 'left') {
        x = -1 * x;
      }
      tabPageView.$element.css({
        x: (-1 * x),
        opacity: 0
      });
      tabPageView.$element.transition({
        x: 0,
        opacity: 1,
        delay: 180
      }, 500, 'easeOutQuart', () => {
        this.selection = tabPageView;
        this.animating = false;
      });
    } else {
      tabPageView.$element.css({
        x: 0,
        opacity: 1
      });
      this.animating = false;
      this.selection = tabPageView;
    }
  }

  _movePage(pageIn, pageOut, animation = true) {
    this.animating = true;

    let $li = null;
    $li = this.$element.find(`#${pageOut.getId()}`);
    $li.removeClass('active');

    $li = this.$element.find(`#${pageIn.getId()}`);
    $li.addClass('active');

    const moveOutIndex = this.getPages().indexOf(pageOut);
    const moveInIndex = this.getPages().indexOf(pageIn);
    let direction = null;
    if (moveInIndex > moveOutIndex) {
      direction = 'left';
    } else {
      direction = 'right';
    }

    this._movePageOut(pageOut, direction, animation);
    this._movePageIn(pageIn, direction, animation);
  }

  clean() {
    if (this.selection) {
      this.selection.clean();
      if (this.moveOutPage) {
        this.moveOutPage.clean();
      }
      if (this.moveInPage) {
        this.moveInPage.clean();
      }
    }
  }
}
