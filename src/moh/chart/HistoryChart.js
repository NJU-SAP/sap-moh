import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class HistoryChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 0, right: 0, top: 0, bottom: 0 } },
      data: { type: 'object' },
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-history-chart');
  }
}
