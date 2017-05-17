import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}

// bus
router.use('/bus', require('./bus').default);

// index
router.use('/index', require('./moh-index').default);

// gis
router.use('/gis', require('./gis').default);

// traffic
router.use('/traffic', require('./traffic').default);

// pilgrim
router.use('/pilgrim', require('./pilgrim').default);


export default router;
