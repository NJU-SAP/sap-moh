import NumberFormat from 'sap/ui/core/format/NumberFormat';

import Tile from './Tile';


export default class StandardTile extends Tile {
  metadata = {
    properties: {
      value: { type: 'any', defaultValue: '', bindable: true },
      valueFormat: { type: 'string', defaultValue: '.0' },
      description: { type: 'string', defaultValue: 'Description' },
      unit: { type: 'string', defaultValue: 'unit' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('bd-standard-tile col-4 row-4');
    this.$element.append("<header><div class='title bd-text-shadow h2'></div><section><span class='value h1 bd-text-shadow'></span><span class='description bd-text-shadow'></span><span class='unit bd-text-shadow'></span></section></header>");
    this.$element.append('<figure></figure>');
    this._numberFormat = NumberFormat.getFloatInstance({ pattern: '#,###.0' });
  }

  setValue(value) {
    // Format
    let strValue = null;
    if (typeof value === 'string') {
      strValue = value;
    } else if (typeof value === 'number') {
      strValue = this._numberFormat.format(value).toString();
    } else {
      return;
    }

    if (strValue !== this.getValue()) {
      this.$('header > section > .value').transit({
        scale: 0.7,
        opacity: 0.7
      }, 160, () => {
        this.$('header > section > .value').text(strValue);
        this.$('header > section > .value').transit({
          scale: 1,
          opacity: 1
        }, 160);
      });
    }
    this.setProperty('value', strValue);
  }

  setValueFormat(format) {
    this.setProperty('valueFormat', format);
    this._numberFormat = NumberFormat.getFloatInstance({ pattern: format });
  }

  setTitle(title) {
    this.setProperty('title', title);
    this.$('header > .title').text(title);
  }

  setDescription(desc) {
    this.setProperty('description', desc);
    this.$('header > section > .description').text(desc);
  }

  setUnit(unit) {
    this.setProperty('unit', unit);
    this.$('header > section > .unit').text(unit);
  }
}
