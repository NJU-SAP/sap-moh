import Layer from 'nju/map/layer/Layer';


export default class BusLineLayer extends Layer {
  metadata = {
    properties: {
      lines: {
        type: 'object',
        default: []
      }
    }
  }

  init() {
    super.init();

    this.linesContainer = L.featureGroup();
    this.container.addLayer(this.linesContainer);
  }

  setLines(lines) {
    this.setProperty('lines', lines);
    if (lines && lines.length > 0) {
      this.linesContainer.clearLayers();

      lines.forEach((line) => {
        const points = line.split(',').map(p => p.split(' ').map(num => parseFloat(num)));
        this.linesContainer.addLayer(L.polyline(points, { color: 'white', weight: 10 }));
      });
    }
  }

}
