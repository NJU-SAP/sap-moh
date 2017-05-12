import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';

import pilgrimRoutes from './../../data/gis/pilgrim-routes.json';

function getRoutesGeoData(name) {
  return pilgrimRoutes[name].routes
  .map(route =>               // route := "x0 y0, x1 y1, ..."
    _.split(route, ',')       // : ["x0 y0", "x1 y1", ]
     .map(pointStr =>         // pointStr: "x y"
           _.split(pointStr, ' ')  // ["x", "y"]
            .map(p => parseFloat(p)))  // [x, y]
    );
}

class PilgrimModel {
  constructor(name) {
    // [ [
    //    [x, y], [...], ...
    //   ],
    //   [ ... ],
    //   ...
    // ]
    this.routes = getRoutesGeoData(name);
    // this.routeSmooth = this.routes.map(route => ({

    // });
    this.pilgrimGroup = null;
  }

  interpolatePilgrimRoutes(route) {
    const path = Smooth(route, {
      method: Smooth.METHOD_CUBIC,
      clip: Smooth.CLIP_PERIODIC,
    }, { scaleTo: 100 });
    return path;
  }

  _soomth() {

  }

  _dispatchPilgrimFlow() {
    this.pilgrimGroup = this.routes[0].map(point => ({
      lat: point[0],
      lng: point[1],
      count: math.randomInt(30, 70)
    }));
  }

  refresh() {
    this._dispatchPilgrimFlow();
  }

  getPilgrimGroups() {
    return this.pilgrimGroup;
  }
}


export default PilgrimModel;
