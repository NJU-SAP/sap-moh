import NumberFormat from 'sap/ui/core/format/NumberFormat';

import Tile from './Tile';


export default class StandardTile extends Tile {
  metadata = {
    properties: {
      title1: { type: 'string', defaultValue: 'Undefined' },
      title2: { type: 'string', defaultValue: 'Undefined' },
      unit: { type: 'string', defaultValue: 'unit' },
      value1: { type: 'any', defaultValue: '', bindable: true },
      value2: { type: 'any', defaultValue: '', bindable: true },
      valueFormat: { type: 'string', defaultValue: '.0' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('bd-standard-tile col-5 row-4');
    this.$element.append(`
      <header>
        <section class='section' id='section1'>
          <div class='title h4 bd-text-shadow'></div>
          <span class='value h2 bd-text-shadow'></span>
          <span class='unit bd-text-shadow'></span>
        </section>
        <section class='section' id='section2'>
          <div class='title h4 bd-text-shadow'></div>
          <span class='value h2 bd-text-shadow'></span>
          <span class='unit bd-text-shadow'></span>
        </section>
      </header>
    `);
    this.$('header > .section').on('click', (e) => {
      this.$('header > .section').removeClass('selected');
      $(e.currentTarget).addClass('selected');
      this.titleSelected(e.currentTarget.id === 'section1' ? 0 : 1);
    });
    this._numberFormat = NumberFormat.getFloatInstance({
       pattern: '#,###.0',
     });
  }

  setValue1(value) {
    let strValue = this.formatValue(value);

    if (strValue !== this.getValue1()) {
      this.$('header > #section1 > .value').transit({
        scale: 0.7,
        opacity: 0.7
      }, 160, () => {
        this.$('header > #section1 > .value').text(strValue);
        this.$('header > #section1 > .value').transit({
          scale: 1,
          opacity: 1
        }, 160);
      });
    }
    this.setProperty('value1', strValue);
  }

  setValue2(value) {
    let strValue = this.formatValue(value);

    if (strValue !== this.getValue2()) {
      this.$('header > #section2 > .value').transit({
        scale: 0.7,
        opacity: 0.7
      }, 160, () => {
        this.$('header > #section2 > .value').text(strValue);
        this.$('header > #section2 > .value').transit({
          scale: 1,
          opacity: 1
        }, 160);
      });
    }
    this.setProperty('value2', strValue);
  }

  setTitle1(title) {
    this.setProperty('title1', title);
    this.$('header > #section1 > .title').text(title);
    this.$('header > #section1').addClass('selected');
  }

  setTitle2(title) {
    this.setProperty('title2', title);
    this.$('header > #section2 > .title').text(title);
  }

  setUnit(unit) {
    this.setProperty('unit', unit);
    this.$('header .unit').text(unit);
  }

  setValueFormat(format) {
    this.setProperty('valueFormat', format);
    this._numberFormat = NumberFormat.getFloatInstance({ pattern: format });
  }

  formatValue(value) {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return this._numberFormat.format(value).toString();
    } else {
      return null;
    }
  }

  titleSelected(index) {
  }
}
