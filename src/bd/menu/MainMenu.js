import View from 'nju/view/View';

export default class MainMenu extends View {
  metadata = {
    aggregations: {
      subviews: { type: 'bd.menu.MenuItem' }
    },

    events: {
      reset: {

      }
    }
  }

  init() {
    super.init();
    this.addStyleClass('bd-main-menu');
    this.addStyleClass('col-2 bottom-1 left-8');

    const $menu = $('<menu><li class=placeholder><span class=diamond></span></li></menu>');
    $menu.children('.placeholder').on('click', () => {
      this.fireReset();
    });
    this.$element.append($menu);
    this.$container = $menu;
  }

  addSubview(subview) {
    super.addSubview(subview);
    const index = this.getSubviews().length;

    switch (index) {
      case 1:
        subview.addStyleClass('row-1 center');
        break;
      case 2:
        subview.addStyleClass('row-2 left');
        break;
      case 3:
        subview.addStyleClass('row-2 right');
        break;
      case 4:
        subview.addStyleClass('row-3 center');
        break;
      case 5:
        subview.addStyleClass('row-4 left');
        break;
      case 6:
        subview.addStyleClass('row-4 right');
        break;
      case 7:
        subview.addStyleClass('row-5 start');
        break;
      case 8:
        subview.addStyleClass('row-5 end');
        break;
      default:
        break;
    }
  }
}
