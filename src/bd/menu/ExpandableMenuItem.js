import MenuItem from './MenuItem';

export default class ExpandableMenuItem extends MenuItem {
  metadata = {
    properties: {
      expandWidth: { type: 'sap.ui.core.CSSSize' },
      expandDirection: { type: 'string', defaultValue: 'left' }
    },
    events: {
      expanding: {},
      expanded: {},
      collapsing: {},
      collapsed: {}
    }
  }
  init() {
    super.init();
    this.addStyleClass('expandable');
    this._initHexagon();
  }
  _initHexagon() {
    this.$hexagon = $('<div class="hexagon-2x"><aside class="left"><span></span></aside><main><div class=container/></main><aside class="right"><span></span></aside></div>');
    this.$container = this.$hexagon.find('.container');
  }
  setExpandDirection(direction) {
    this.setProperty('expandDirection', direction);
    this.toggleStyleClass('left-expand', direction === 'left');
    this.toggleStyleClass('right-expand', direction === 'right');
  }
  setActive(active) {
    if (this.animating) return;
    super.setActive(active);
    if (this.getActive()) {
      this._expand();
    } else {
      this._collapse();
    }
  }
  expand() {
    this.setActive(true);
  }
  collapse() {
    this.setActive(false);
  }
  onPress() {
    this.toggleActive();
  }
  _expand() {
    this.fireExpanding();
    this.animating = true;
    this.$element.append(this.$hexagon);

    this.$container.css({ opacity: 0 }).delay(250).transit({
      opacity: 1
    }, 400);
    this.$hexagon.css({
      width: 0,
      scale: 0.5,
      opacity: 1,
      x: 0
    }).transit({
      scale: 1
    }, 150).transit({
      width: this.getExpandWidth()
    }, 500, () => {
      this.fireExpanded();
      this.animating = false;
    });
  }
  _collapse() {
    this.animating = true;
    this.fireCollapsing();
    this.$container.transit({
      opacity: 0
    }, 400);
    this.$hexagon.transit({
      width: 0
    }, 400).transit({
      scale: 0.5,
      x: (this.getExpandDirection() === 'left' ? '4.2em' : '-4.2em'),
      opacity: 0
    }, 400, () => {
      this.$hexagon.detach();
      this.fireCollapsed();
      this.animating = false;
    });
  }
}
