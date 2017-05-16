import View from 'nju/view/View';

export default class Checkbox extends View {
  metadata = {
    properties: {
      text: { type: 'string' },
      status: { type: 'boolean', defaultValue: false }                 // true: checked, false: unchecked
    },

    events: {
      statusChanged: {
        parameters: {
          status: 'boolean'
        }
      }
    }
  }

  init() {
    super.init();
    this.addStyleClass('check-view');
    this._initChekcbox();
  }

  _initChekcbox() {
    this.$element = $(`<div class="checkbox-container">
                          <span class="left">Overall</span>
                          <div class="checkbox"/>
                          <span class="right">Bus</span>
                        </div>`);

    this._initHexagon();
    this._initDiamond();

    this.$element.on('click', this._checkBox_onclick.bind(this));
  }

  _initHexagon() {
    this.$hexagon = $('<div class="hexagon-small"><aside class="left"><span></span></aside><main><div class=container/></main><aside class="right"><span></span></aside></div>');
    this.$element.children('.checkbox').append(this.$hexagon);
    this.$container = this.$hexagon.find('.container');
  }

  _initDiamond() {
    this.$diamond = $('<div class=diamond><span/></div>');
    this.$element.children('.checkbox').append(this.$diamond);
  }

  _checkBox_onclick(e) {
    this.setChecked(!this.getStatus());
  }

  setChecked(status) {
    this.setStatus(status);
    const $checkbox = this.$element.children('.checkbox');
    const containerWidth = this.$hexagon.width();
    let x = null;
    if (!status) {
      $checkbox.removeClass('checked');
      x = -1 * containerWidth;
    } else {
      $checkbox.addClass('checked');
      x = 0;
    }

    this.$diamond.transition({
      x
    }, 150, 'easeOutCubic');

    this.fireStatusChanged({
      status
    });
  }
}
