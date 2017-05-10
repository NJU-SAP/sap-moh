import { Router } from 'express';
const router = Router();

const stations = {};

router.get('/arrival', async (req, res) => {
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

export default router;
