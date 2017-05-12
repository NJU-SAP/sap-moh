import { Router } from 'express';
import moment from 'moment';

import PilgrimModel from './../../model/PilgrimModel';

const router = Router();

const model = new PilgrimModel('Kaaba');

router.get('/heatmap', async (req, res) => {
  model.refresh();
  res.json(model.getPilgrimGroups());
});

export default router;
