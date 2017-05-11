import PanelContainer from 'bd/panel/PanelContainer';

export default class FloatingPanelContainer extends PanelContainer {
  init() {
    super.init();
    this._initHeader();
    this._initContainer();

    this.animating = true;   // if floating panel is animating

    this._initDock();

    this._timeoutId = null;
    this._panelStatus = true; // false indicates hidden, true indicates shown.

    this.panelSet = {};
    this.selection = null;    // panel selected
  }

  _initHeader() {
    this.$header = $('<ul class=panel-icon></ul>');
    this.$spring = $('<li class=spring/>');
    this.$header.append(this.$spring);
    this.$element.append(this.$header);
    this.$header.on('click', 'li', (e) => {
      if (!$(e.currentTarget).hasClass('spring')) {
        this.selectPanel($(e.currentTarget).attr('id'));
      }
    });
  }

  _initContainer() {
    this.$container = $('<main></main>');
    this.$element.append(this.$container);
  }

  _initDock() {
    const $dock = $("<div class=dock><span class='mf mf-setting normal'/></div>");
    this.$container.append($dock);
    $dock.on('click', 'span', (e) => {
      if (this.animating) {
        return;
      }
      const $icon = $(e.currentTarget);
      if ($icon.hasClass('docked')) {
        this.undock(...$icon);
      } else {
        this.dock(...$icon);
      }
    });
  }

  initPanel() {
    this.getPanels().forEach((panel) => {
      panel.getListView().initItems();
    });
  }

  initPanelContainer() {
    this.hidePanel();
    //this._startPanelListening();
  }

  addPanel(panel) {
    this.addAggregation('panels', panel);
    this.panelSet[panel.getId()] = panel;
    const numOfPanel = this.getPanels().length;

    const $li = $('<li><span></span></li>');
    $li.attr('id', panel.getId());
    $li.children('span').addClass(panel.getIcon());

    $li.insertBefore(this.$header.children('.spring'));

    if (numOfPanel === 1) {
      this.selectPanel(0);
    }
  }

  selectPanel(panel) {
    let curPanel = null;
    if (!isNaN(panel - 0)) {
      // num or string but can be transform to num
      const index = panel - 0;
      curPanel = this.getPanels()[index] ? this.getPanels()[index] : null;
    } else if (typeof (panel) === 'string') {
      curPanel = this.panelSet[panel] ? this.panelSet[panel] : null;
    } else if (panel instanceof bd.panel.Panel) {
      curPanel = panel;
    } else {
      throw new Error('Invalid type of view.');
    }

    if (this.selection === curPanel) {
      return;
    }

    let $li = null;
    if (this.selection !== null) {
      $li = this.$element.find(`#${this.selection.getId()}`);
      $li.removeClass('active');
      this.selection.$element.detach();
    }

    this.selection = curPanel;
    $li = this.$element.find(`#${this.selection.getId()}`);
    $li.addClass('active');

    this.fireOnSelectionChanged();

    this.$container.append(this.selection.$element);
  }

  showPanel() {
    this.animating = true;
    this.$element.animate({
      left: '0'
    }, 200, 'swing', () => {
      this._timeoutId = null;
      this.animating = false;
      this._panelStatus = true;
    });
  }

  hidePanel() {
    const containerWidth = this.$container.width();
    this.animating = true;
    this.$element.animate({
      left: `${-containerWidth - 1}px`
    }, 200, () => {
      this._timeoutId = null;
      this.animating = false;
      this._panelStatus = false;
    });
  }

  dock(dockIcon) {
    $(dockIcon).addClass('docked');
    this._stopPanelListening();
  }

  undock(dockIcon) {
    $(dockIcon).removeClass('docked');
    this._startPanelListening();
  }

  _startPanelListening() {
    this.$element.on('mouseenter', this._panelContainer_onmouseenter.bind(this));
    this.$element.on('mouseleave', this._panelContainer_onmouseleave.bind(this));
  }

  _stopPanelListening() {
    this.$element.off('mouseenter');
    this.$element.off('mouseleave');
  }

  _panelContainer_onmouseenter(e) {
    this.$element.stop(true, false);
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    if (this.animating) {
      // if floating panel is moving, stop the animation
      this.showPanel();
    } else if (!this._panelStatus) {
      this._timeoutId = setTimeout(() => {
        this.showPanel();
      }, 380);
    }
  }

  _panelContainer_onmouseleave(e) {
    this.$element.stop(true, false);
    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    if (this.animating) {
      // if floating panel is moving, stop the animation
      this.hidePanel();
    } else if (this._panelStatus) {
      this._timeoutId = setTimeout(() => {
        this.hidePanel();
      }, 600);
    }
  }
}
