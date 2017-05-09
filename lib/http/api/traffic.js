import { Router } from 'express';
import moment from 'moment';

import trafficModelFactory from './../../model/TrafficModel';

const router = Router();

// prefix: /api/traffic/${...}
router.get('/', async (req, res) => {
  try {
    const time = moment(req.query.time);
    const trafficModel = await trafficModelFactory.getTrafficModel();
    await trafficModel.refreshTrafficSpeed(time);
    res.json(trafficModel.getEdgeSpeedData());
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

export default router;
