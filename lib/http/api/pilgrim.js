import { Router } from 'express';
import moment from 'moment';
import _ from 'lodash';

import PilgrimModel from './../../model/PilgrimModel';

const router = Router();

const kaabaPilgrimModel = new PilgrimModel('Kaaba');
const bridgePilgrimModel = new PilgrimModel('Jama Rat BRidge');

router.get('/heatmap', async (req, res) => {
  try {
    const result =
      _.flatMap([kaabaPilgrimModel, bridgePilgrimModel], (model) => {
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
