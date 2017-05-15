import TabPageView from 'bd/view/TabPageView';


export default class BusDriverTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Driver' }
    }
  }

  init() {
    super.init();

    this.addStyleClass('moh-bus-driver-tab-page');

    this.$container.html(`
      <div class="placeholder">
        <div class="driver-photo"/>
        <div class="page">
          <h3>Driver Information Page</h3>
        </div>
      </div>
    `);
  }
}
