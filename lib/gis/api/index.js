import { Router } from 'express';

import GisService from './../logic/GisService';

const gisService = new GisService();

// gis
// prefix: /api/gis/${...}
const router = Router();
// gis/ways
router.get('/ways', async (req, res) => {
  try {
    const waysData = await gisService.getWaysData();
    // client cache
    const maxAge = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxAge}`);
    res.send(waysData);
  } catch (e) {
    res.status(500).end();
  }
});


// gis/edges
router.get('/edges', async (req, res) => {
  try {
    const edgesData = await gisService.getEdgesData();
    const maxAge = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxAge}`);
    res.send(edgesData);
  } catch (e) {
    res.status(500).end();
  }
});

export default router;
