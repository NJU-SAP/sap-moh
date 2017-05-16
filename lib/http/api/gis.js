import { Router } from 'express';

import GisModel from '../../model/GisModel';

const gisModel = new GisModel();

// gis
// prefix: /api/gis/${...}
const router = Router();
// gis/ways
router.get('/ways', async (req, res) => {
  try {
    const waysData = await gisModel.getWaysData();
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
    const edgesData = await gisModel.getEdgesData();
    const maxAge = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxAge}`);
    res.send(edgesData);
  } catch (e) {
    res.status(500).end();
  }
});

// gis/stations
router.get('/bus/lines', async (req, res) => {
  try {
    const linesData = await gisModel.getLinesData();
    const maxAge = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxAge}`);
    res.send(linesData);
  } catch (e) {
    res.status(500).end();
  }
});


// gis/stations
router.get('/bus/stations', async (req, res) => {
  try {
    const stationsData = await gisModel.getStationsData();
    const maxAge = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxAge}`);
    res.send(stationsData);
  } catch (e) {
    res.status(500).end();
  }
});

export default router;
