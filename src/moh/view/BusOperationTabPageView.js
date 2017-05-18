import TabPageView from 'bd/view/TabPageView';


export default class BusOperationTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Speed' }
    }
  }
  init() {
    super.init();
    var chart=$("<h1>lal</h1>")

    this.$element.append(chart)
  }

}
