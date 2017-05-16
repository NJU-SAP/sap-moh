import _ from 'lodash';
import math from 'mathjs';

import { Smooth } from './smooth';
import pilgrimRoutes from './../../data/gis/pilgrim-routes.json';

// can only use require due to incorrect export in d3-random
const d3 = require('d3-random');

function RoutesGeoData(name) {
  const routes = pilgrimRoutes[name].routes
  .map(route =>                           // route := "x0 y0, x1 y1, ..."
    _.split(route, ',')                   // : ["x0 y0", "x1 y1", ]
     .map(pointStr =>                     // pointStr: "x y"
           _.split(pointStr, ' ')         // ["x", "y"]
            .map(p => parseFloat(p)))     // [x, y]
    );
  const density = pilgrimRoutes[name].density;
  return { routes, density };
}

export default class PilgrimModel {
  constructor(name) {
    // [ [
    //    [x, y], [...], ...
    //   ],
    //   [ ... ],
    //   ...
    // ]
    this.pathScore = 100;
    const geoData = RoutesGeoData(name);
    // this.routes = geoData.routes;
    this.density = geoData.density;
    this.pilgrimRoute = geoData.routes.map(route => ({
      smooth: this.interpolatePilgrimRoutes(route),
      // route,
      pilgrimGroups: [],
    }));

    this.pilgrimRoute.forEach((route) => {
      // large pilgrim group
      const largeGroupForwardFunction = () => {
        const forwardUnit = 0.2;
        const r = d3.randomNormal(forwardUnit, forwardUnit * 0.1);
        return () => math.max(0, math.min(forwardUnit * 1.3, r()));
      };
      this._dispatchPilgrimFlow({
        pilgrimRoute: route,
        groupsCount: 50,
        avgGroupSize: 30,
        floatRatio: 20 / 30,
        forward: largeGroupForwardFunction()
      });

      // small pilgrim group
      const smallGroupForwardFunction = () => {
        const forwardUnit = 0.3;
        const r = d3.randomNormal(forwardUnit, forwardUnit);
        return () => r();
      };
      this._dispatchPilgrimFlow({
        pilgrimRoute: route,
        groupsCount: 50,
        avgGroupSize: 4,
        floatRatio: 0.75,
        forward: smallGroupForwardFunction(),
      });
    });
  }

  interpolatePilgrimRoutes(route) {
    const path = Smooth(route, {
      method: Smooth.METHOD_CUBIC,
      clip: Smooth.CLIP_PERIODIC,
    }, { scaleTo: this.pathScore });
    return path;
  }

  _dispatchPilgrimFlow({ pilgrimRoute, groupsCount, avgGroupSize, floatRatio, forward }) {
    let n = groupsCount;
    const score = this.pathScore;
    const groupSizeRandom = d3.randomNormal(avgGroupSize, (avgGroupSize * floatRatio) / 3);
    const pilgrimGroups = {
      forward,
      groups: [],
    };
    while (n > 0) {
      const coefficient = math.random(score);
      const groupSize = math.round(math.max(1, groupSizeRandom()) * this.density);
      const location = pilgrimRoute.smooth(coefficient);
      pilgrimGroups.groups.push({
        location,
        coefficient,
        count: groupSize,
      });
      n -= 1;
    }
    pilgrimRoute.pilgrimGroups.push(pilgrimGroups);
  }

  refresh() {
    this.pilgrimRoute.forEach((route) => {
      route.pilgrimGroups.forEach((pilgrimGroup) => {
        const { forward, groups } = pilgrimGroup;
        groups.forEach((forwardGroup) => {
          const group = forwardGroup;
          let coefficient = group.coefficient;
          const val = forward();
          coefficient += val;
          group.location = route.smooth(coefficient);
          group.coefficient = coefficient;
        });
      });
    });
  }

  getPilgrimGroups() {
    return _.flatMap(this.pilgrimRoute, route =>
      _.flatMap(route.pilgrimGroups, pilgrimGroups => pilgrimGroups.groups))
      .map(group => ({ location: group.location, count: group.count }));
  }
}

export { RoutesGeoData };
