import View from 'nju/view/View';

export default class MenuItem extends View {
  metadata = {
    properties: {
      text: { type: 'string' },
      icon: { type: 'string' },
      active: { type: 'boolean', defaultValue: false }
    },
    events: {
      press: {}
    }
  }

  init() {
    super.init();
    this.$element.append('<span class="diamond"></span><span class="text"></span><span class="icon"></span>');

    this.$element.on('click', '> .diamond, > .text, > .icon', () => {
      this.onPress();
      this.firePress();
    });
  }
  getElementTag() {
    return 'li';
  }
  setText(text) {
    this.setProperty('text', text);
    this.$element.children('.text').text(text);
  }
  setIcon(icon) {
    this.setProperty('icon', icon);
    this.$element.children('.icon').addClass(icon);
  }
  setActive(active) {
    this.setProperty('active', active);
    this.$element.toggleClass('active', this.getActive());
  }
  toggleActive() {
    this.setActive(!this.getActive());
  }
  onPress() {

  }
}
