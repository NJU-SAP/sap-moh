import DateFormat from 'sap/ui/core/format/DateFormat';

import View from 'nju/view/View';

export default class DataClockView extends View {
  metadata = {
    properties:
    {
      time: { type: 'object', bindable: true },
      historical: { type: 'boolean', defaultValue: false }
    }
  }

  init() {
    super.init();
    this._timeFormat = DateFormat.getTimeInstance({ pattern: 'HH  mm' });
    this._dateFormat = DateFormat.getDateInstance({ pattern: 'EEEE, MMMM d' }, this.getLocale());

    this.addStyleClass('bd-data-clock-view');
    this.addStyleClass('col-4 row-1');
    this._initClock();
  }

  _initClock() {
    const $content = $("<div class=container><span class='title bd-text-shadow'></span><section><time class='start h2 bd-text-shadow'></time><span class=h2><span class=space></span></span><time class='end h2 bd-text-shadow'></time></section></div>");
    this._$colon = $("<span class='colon h2'/>");
    $content.children('section').append(this._$colon);
    this.today = new Date();
    this.$element.append($content);
    // Initialize time displayed on clock.
    this.$element.find('.end').html('&nbsp;');
  }

  setTime(data) {
    let time = null;
    if (data === null || data === undefined) {
      this.setProperty('time', data);
      return;
    } else if (Array.isArray(data)) {
      time = data[data.length - 1].time;
    } else {
      time = data;
    }

    let oTime = null;
    if (typeof time === 'number' || typeof time === 'string') {
      oTime = new Date(time);
    } else if (typeof time === 'object') {
      oTime = time;
    } else {
      throw new Error('The parameter is invalid.');
    }

    this.setProperty('time', oTime);
    const title = this._dateFormat.format(this.today);
    this.$element.find('.title').text(title);
    const endTime = this._timeFormat.format(new Date(oTime));
    this.$element.find('.end').text(endTime);
    this.$element.find('.colon').text(':');
  }

  setHistorical(historical) {
    this.setProperty('historical', historical);
    this.$('.container').toggleClass('historical', historical);
    this.$('.colon').toggleClass('active', !historical);
  }
}
