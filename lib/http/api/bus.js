import { Router } from 'express';

import BusLineFlowModel from './../../model/BusModel';

const router = Router();

const stations = {};


// const busLineFlowModel = new BusLineFlowModel({
//   busCount: 3000,
//   points: 500
// });

router.get('/arrivals', async (req, res) => {
  let stationId = req.query.stationId;
  if (!stationId) {
    stationId = 1;
  }
  let buses = stations[stationId];
  if (!buses) {
    buses = [];
    stations[stationId] = buses;
    for (let i = 0; i < 10 + Math.round(Math.random() * 5); i++) {
      const bus = {
        id: 10000 + Math.round(Math.random() * 20000),
        pilgrims: 50 + Math.round(Math.random() * 20),
        arrivalIn: 1 + Math.round(Math.random() * 14)
      };
      buses.push(bus);
    }
    buses.sort((a, b) => a.arrivalIn - b.arrivalIn);
  }
  res.send(buses);
});


// router.get('/rt', async (req, res) => {
//   const points = busLineFlowModel.getAllBusLinePathSectionPoints();
//   res.json({ points, sectionPathStatus: busLineFlowModel._sectionPathStatus });
// });

export default router;
