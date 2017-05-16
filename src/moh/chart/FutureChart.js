import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class FutureChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 30, right: 20, top: 20, bottom: 10 } },
      data: { type: 'object' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-future-chart');
  }

  setData(value) {
    this.setProperty('data', value);
  }

  redraw() {
    super.redraw();
  }
}
