import { Router } from 'express';
import moment from 'moment';
import _ from 'lodash';

import { rtIndexModelFactory, predictIndexModelFactory } from './../../model/IndexModel';

const router = Router();

async function packagingIndexDataList(indexModelFactory, fromMinutes, toMinutes) {
  const modelList = await Promise.all([
    indexModelFactory.getBusCountIndexModel(),
    indexModelFactory.getBusSpeedIndexModel(),
    indexModelFactory.getOverallSpeedIndexModel(),
    indexModelFactory.getPilgrimCountIndexModel()
  ]);
   // [ [2, 3, ...], [2, 3, ...], ... , ... ]
  const indexDataList = modelList.map(model => model.getIndexData(fromMinutes, toMinutes));
  // [ { buscount: , busSpeed, pil , overall}, { ... }, ...]
  const results = _.zipWith(
    indexDataList[0],
    indexDataList[1],
    indexDataList[2],
    indexDataList[3],
    (busCount, busSpeed, pilgrimCount, overallSpeed) => ({
      busCount, busSpeed, pilgrimCount, overallSpeed
    }));
  return results;
}


// prefix: /api/index/${...}
router.get('/rt', async (req, res) => {
  const fromDate = moment(req.query.from);
  const toDate = moment(req.query.to);
  const fromMinutes = (fromDate.hours() * 60) + fromDate.minutes();
  const toMinutes = (toDate.hours() * 60) + toDate.minutes();
  if (fromDate.isBefore(toDate) && fromMinutes < toMinutes) {
    try {
      const results = await packagingIndexDataList(rtIndexModelFactory, fromMinutes, toMinutes);
      res.json(results);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  } else {
    res.status(400).end();
  }
});

router.get('/predict', async (req, res) => {
  const fromDate = moment(req.query.from);
  const toDate = moment(req.query.to);
  const fromMinutes = (fromDate.hours() * 60) + fromDate.minutes();
  const toMinutes = (toDate.hours() * 60) + toDate.minutes();
  if (fromDate.isBefore(toDate) && fromMinutes < toMinutes) {
    try {
      const results = await packagingIndexDataList(predictIndexModelFactory, fromMinutes, toMinutes);
      res.json(results);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  } else {
    console.log('Invalid from and to query arguments');
    res.status(400).end();
  }
});


export default router;
