import { Router } from 'express';
import moment from 'moment';
import _ from 'lodash';

import IndexModelFactory from './../../model/IndexModel';

const router = Router();

const indexModelFactory = new IndexModelFactory();

// prefix: /api/index/${...}
router.get('/rt', async (req, res) => {
  const fromDate = moment(req.query.from);
  const toDate = moment(req.query.to);
  if (fromDate.isBefore(toDate)) {
    const fromMinutes = (fromDate.hours() * 60) + fromDate.minutes();
    const toMinutes = (toDate.hours() * 60) + toDate.minutes();
    if (fromMinutes < toMinutes) {
      try {
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
        res.json(results);
      } catch (e) {
        console.error(e);
        res.status(500).end();
      }
    }
  }
});

// router.get('/predict', async (req, res) => {

// });


export default router;
