import { Router } from 'express';
import moment from 'moment';

import trafficModelFactory from './../../model/TrafficModel';
import DistrictTrafficModel from './../../model/DistrictTrafficModel';

const districtTrafficModel = new DistrictTrafficModel('time');


const router = Router();

// prefix: /api/traffic/${...}
router.get('/edge-speed', async (req, res) => {
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

router.get('/district-speed', async (req, res) => {
  const time = moment(req.query.time);
  await districtTrafficModel.init();
  const result = await districtTrafficModel.getDistrictsTraffic(time);
  res.json(result);
});


export default router;
