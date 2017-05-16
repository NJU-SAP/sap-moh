import { Router } from 'express';
import _ from 'lodash';

import GroupOfPilgrimModel from './../../model/GroupOfPilgrimModel';
import { RoutesGeoData } from './../../model/PilgrimModel';

const router = Router();

const randomKabbaRoute = _.sample(RoutesGeoData('Kaaba').routes);
const model = new GroupOfPilgrimModel('Kaaba', randomKabbaRoute, { groupSize: 30 });

router.get('/rt', async (req, res) => {
  try {
    model.refresh();
    const result = model.getPilgrimGroups();
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

export default router;
