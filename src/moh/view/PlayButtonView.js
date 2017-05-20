import View from 'nju/view/View';


export default class PlayButtonView extends View {
  metadata = {
    properties: {
      playing: { type: 'boolean', default: false }
    },
    events: {
      click: { }
    }
  }

  init() {
    super.init();

    this.addStyleClass('moh-play-button');

    this.$container.text('Play');
    this.$container.on('click', () => {
      this.fireClick();
    });
  }

  setPlaying(value) {
    if (value !== this.getPlaying()) {
      this.setProperty('playing', value);
      if (value) {
        this.$container.addClass('playing');
        this.$container.text('Pause');
      } else {
        this.$container.removeClass('playing');
        this.$container.text('Play');
      }
    }
  }
}
