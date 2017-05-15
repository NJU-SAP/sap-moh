import TabPageView from 'bd/view/TabPageView';


export default class BusDriverTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Driver' }
    }
  }
}
