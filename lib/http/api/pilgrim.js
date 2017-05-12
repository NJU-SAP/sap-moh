import { Router } from 'express';
import moment from 'moment';
import _ from 'lodash';

import pilgrimModels from './../../model/PilgrimModel';

const router = Router();

router.get('/heatmap', async (req, res) => {
  try {
    const result =
      _.flatMap(pilgrimModels, (model) => {
        model.refresh(req.query.time);
        return model.getPilgrimGroups();
      });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

export default router;
