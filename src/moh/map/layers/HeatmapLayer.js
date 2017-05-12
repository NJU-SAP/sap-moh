import Layer from 'nju/map/layer/Layer';


export default class HeatmapLayer extends Layer {
  metadata = {
    properties: {
      heatmap: { type: 'object', bindable: true }
    }
  }

  init() {
    super.init();

    this._initHeatMapOverlay();
  }

  _initHeatMapOverlay() {
    this.heatmap = L.heatLayer([]);
  }

  setHeatmap(value) {
    this.setProperty('heatmap', value);

    if (!value) return;

    this._updateHeatmap(value);
  }

  _updateHeatmap(value) {
    const va = value.map(v => [v.location[1], v.location[0], v.count / 200]);

    this.heatmap.setLatLngs(va);
  }

}
