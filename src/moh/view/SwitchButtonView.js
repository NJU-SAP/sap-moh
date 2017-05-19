import View from 'nju/view/View';

export default class SwitchButtonView extends View {
  metadata = {
    properties: {
      district: { type: 'boolean', bindable: true }
    },
    events: {
      btnClick: {
        parameters: {
          mapView: { type: 'string' }
        }
      }
    }
  }

  init() {
    super.init();

    this._initButton();
  }

  _initButton() {
    this.$element = $('<div class=switch-button-view>2x</div>');

    this.$element.on('click', () => {
      this.fireBtnClick({
        mapView: this.getParent().sId
      });
    });
  }

  setDistrict(value) {
    this.setProperty('district', value);

    if (!value) {
      if (this.getParent().sId === 'mapView') {
        this.$element.addClass('hide');
      } else {
        this.$element.removeClass('hide');
      }
    } else {
      if (this.getParent().sId === 'mapView') {
        this.$element.removeClass('hide');
      } else {
        this.$element.addClass('hide');
      }
    }
  }
}
