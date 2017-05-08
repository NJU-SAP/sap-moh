import SuperMapView from 'bd/map/MapView';

export default class MapView extends SuperMapView {
  metadata = {
    properties: {
      defaultZoom: {
        type: 'int',
        defaultValue: 15
      }
    }
  }
}
