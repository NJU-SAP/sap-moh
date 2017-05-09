import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}

// index
router.use('/index', require('./moh-index').default);

// gis
router.use('/gis', require('./../../gis/api').default);

export default router;
