import MenuItem from 'bd/menu/MenuItem';

export default class NowMenuItem extends MenuItem {
  metadata = {
    properties: {
      rt: { type: 'boolean', bindable: true }
    }
  }
  init() {
    super.init();
    this.addStyleClass('now');
  }

  setRt(value) {
    this.setProperty('rt', value);

    if (value === undefined) return;

    this.setActive(value);
  }
}
