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

  _updateGroup(groups) {
    this.GOPContainer.clearLayers();

    Object.keys(groups).forEach((groupId) => {
      const group = groups[groupId];
      const iconSize = 8;
      const groupIcon = L.divIcon({
        html: '<div class="group-container"></div>',
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2],
        className: 'station'
      });
      const groupMarker = L.marker([group.location[1], group.location[0]], {
        icon: groupIcon,
        zIndexOffset: 1000
      });
      this.GOPContainer.addLayer(groupMarker);
    });
  }

}
