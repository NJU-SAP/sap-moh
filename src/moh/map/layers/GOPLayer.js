import Layer from 'nju/map/layer/Layer';


export default class GOPLayer extends Layer {
  metadata = {
    properties: {
      group: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();

    this.GOPContainer = L.featureGroup();

    this.container.addLayer(this.GOPContainer);
  }

  setGroup(value) {
    this.setProperty('group', value);

    if (!value) return;

    this._updateGroup(value);
  }

  _updateGroup(value) {
    console.log(value);
  }

}
