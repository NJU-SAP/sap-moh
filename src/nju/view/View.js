import ManagedObject from 'sap/ui/base/ManagedObject';


export default class View extends ManagedObject {
  metadata = {
    properties: {
      frame: { type: 'object', defaultValue: null }
    },
    aggregations: {
      subviews: { type: 'nju.view.View' }
    },
    events: {
      addedToParent: {

      }
    }
  }

  constructor(...args) {
    super(...args);
    this.afterInit();
  }

  init() {
    this.$element = $(document.createElement(this.getElementTag()));
    this.$element.attr('id', this.getId());
    this.$element.addClass('nju-view');
    this.$container = this.$element;
    this.subviewSet = {};

    if (this.__placeAt) {
      this.placeAt(this.__placeAt);
      delete this.__placeAt;
    }
  }

  afterInit() {

  }

  getElementTag() {
    return 'div';
  }

  getEmSize(count = 1) {
    let size = 0;
    if (window.emSize === undefined) {
      size = parseInt($('body').css('font-size'), 0);
      window.emSize = size;
    } else {
      size = window.emSize;
    }
    return size * count;
  }

  $(selector) {
    if (selector === undefined) {
      return this.$element;
    }
    return this.$element.find(selector);
  }

  getSubview(index) {
    if (typeof (index) === 'number') {
      return this.getSubviews()[index] ? this.getSubviews()[index] : null;
    } else if (typeof (index) === 'string') {
      return this.subviewSet[index] ? this.subviewSet[index] : null;
    }
    return null;
  }

  addSubview(subview, $parent) {
    if (!subview) return this;
    const $container = $parent || this.$container;
    this.addAggregation('subviews', subview);
    $container.append(subview.$element);
    subview.fireAddedToParent();
    this.subviewSet[subview.getId()] = subview;
    return this;
  }

  insertSubview(subview, index = 0) {
    const length = this.getSubviews().length;
    if (index > length) {
      index = length;
    }

    const targetView = this.getSubviews()[index];
    this.insertAggregation('subviews', subview, index);
    if (index >= length) {
      this.addSubview(subview);
    } else {
      subview.$element.insertBefore(targetView.$element);
    }
    this.subviewSet[subview.getId()] = subview;
    return this;
  }

  removeSubview(subview) {
    const removed = this.removeAggregation('subviews', subview);
    if (removed !== null) {
      removed.$element.detach();
    }
    this.subviewSet[subview.getId()] = null;
    delete this.subviewSet[subview.getId()];
    return removed;
  }

  removeAllSubviews() {
    while (this.getSubviews().length > 0) {
      const toBeRemoved = this.getSubviews()[0];
      this.removeSubview(toBeRemoved);
    }
  }

  addStyleClass(cls) {
    this.$element.addClass(cls);
    return this;
  }
  hasStyleClass(cls) {
    this.$element.hasClass(cls);
  }
  removeStyleClass(cls) {
    this.$element.removeClass(cls);
    return this;
  }
  toggleStyleClass(cls, state) {
    this.$element.toggleClass(cls, state);
    return this;
  }

  show(options) {
    this.$element.show(options);
  }

  hide(options) {
    this.$element.hide(options);
  }

  setFrame(frame, invalidate, resetAll) {
    if (!resetAll) {
      const currentFrame = this.getFrame();
      if (currentFrame !== null) {
        frame = $.extend(currentFrame, frame);
      }
    } else {
      frame = $.extend({ width: '', height: '', top: '', left: '', right: '', bottom: '' }, frame);
    }
    this.setProperty('frame', frame);

    if (frame.width !== undefined) {
      this.$element.css('width', frame.width);
    }
    if (frame.height !== undefined) {
      this.$element.css('height', frame.height);
    }
    if (frame.left !== undefined && frame.left !== null ||
      frame.right !== undefined && frame.right !== null ||
      frame.top !== undefined && frame.top !== null ||
      frame.bottom !== undefined && frame.bottom !== null
    ) {
      const pos = this.$element.css('position');
      if (pos === 'static' || pos === 'relative') {
        this.$element.css('position', 'absolute');
      }
    }
    if (frame.left !== undefined) {
      this.$element.css('left', frame.left);
    }
    if (frame.top !== undefined) {
      this.$element.css('top', frame.top);
    }
    if (frame.right !== undefined) {
      this.$element.css('right', frame.right);
    }
    if (frame.bottom !== undefined) {
      this.$element.css('bottom', frame.bottom);
    }
  }

  placeAt(target) {
    let $target = null;
    if (typeof (target) === 'string') {
      $target = $(`#${target}`);
    } else {
      $target = $(target);
    }
    $target.append(this.$element);
  }
}
