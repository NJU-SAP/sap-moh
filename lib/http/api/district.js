import { Router } from 'express';

import DistrictTrafficModel from './../../model/DistrictTrafficModel';

const model = new DistrictTrafficModel();

const router = Router();

router.get('/rt', async (req, res) => {
  await model.init();
  const result = await model.getDistrictsTraffic();
  res.json(result);
});

export default router;
