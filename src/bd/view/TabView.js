import View from 'nju/view/View';


export default class TabView extends View {
  metadata = {
    aggregations: {
      pages: { type: 'bd.view.TabPageView' }
    },

    events: {
      onSelectionChanged: {

      }
    }
  }

  init() {
    super.init();

    this.addStyleClass('tab-view');
    this._initTabNav();
    this._initMain();
    this.pageSet = {};                                      // Index of page
    this.selection = null;                                  // Chosen page
  }

  _initTabNav() {
    this._$tabNav = $('<ul></ul>');
    this._$tabNav.on('click', 'li', (e) => {
      this._tabNav_onClick(e);
    });
    this._initNavList();
    this.$element.append(this._$tabNav);
  }

  _initMain() {
    this.$container = $('<main/>');
    this.$element.append(this.$container);
  }

  _initNavList() {

  }

  selectTabPage(tabPageView) {
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
    if (this.selection !== null) {
      $li = this.$element.find(`#${this.selection.getId()}`);
      $li.removeClass('active');
      this.selection.$element.detach();
    }

    this.selection = page;
    $li = this.$element.find(`#${this.selection.getId()}`);
    $li.addClass('active');

    this.fireOnSelectionChanged();

    this.$container.append(this.selection.$element);
  }


  getPage(page) {
    if (typeof (page) === 'number') {
      return this.getPages()[page] ? this.getPages()[page] : null;
    } else if (typeof (page) === 'string') {
      return this.pageSet[page] ? this.pageSet[page] : null;
    }
    return null;
  }

  addPage(page) {
    if (page instanceof bd.view.TabPageView) {
      this._addPage(page);
    }
  }

  _addPage(tabPageView) {
    this.addAggregation('pages', tabPageView);
    this.pageSet[tabPageView.getId()] = tabPageView;
    const title = tabPageView.getTitle();
    const $li = $('<li/>');
    $li.text(title);
    $li.attr('id', tabPageView.getId());
    this._$tabNav.append($li);

    if (this.getPages().length === 1) {
      this.selectTabPage(0);
    }
  }

  _tabNav_onClick(e) {
    this.selectTabPage(e.currentTarget.id);
  }
}
