import { Router } from 'express';
import _ from 'lodash';

import PilgrimModel from './../../model/PilgrimModel';
import pilgrimRoutes from './../../../data/gis/pilgrim-routes.json';

const router = Router();
const pilgrimModels = _.keys(pilgrimRoutes).map(name => new PilgrimModel(name));

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
