import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}

// index
router.use('/index', require('./mohindex').default);

export default router;
