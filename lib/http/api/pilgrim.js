import { Router } from 'express';
import moment from 'moment';

import PilgrimModel from './../../model/PilgrimModel';

const router = Router();

const model = new PilgrimModel('Kaaba');

router.get('/heatmap', async (req, res) => {
  try {
    model.refresh(req.query.time);
    res.json(model.getPilgrimGroups());
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

export default router;
