import TabPageView from 'bd/view/TabPageView';


export default class BusGroupingTabPageView extends TabPageView {
  metadata = {
    properties: {
      title: { type: 'string', defaultValue: 'Grouping' }
    }
  }

  init() {
    super.init();

    this.addStyleClass('moh-view-busGroupingTabPageView');

    this._initMain();
  }

  _initMain() {
    const $info = $('<div class="info h3">Pilgrim Grouping Information Page</div>');
    this.$container.append($info);

    const $footer = $(`
      <footer>
        <button class="loc">Location</button>
        <button class="delay">Delay Notification</button>
      </footer>
    `);
    this.$container.append($footer);
  }
}
