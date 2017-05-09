import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}

// index
router.use('/index', require('./moh-index').default);

export default router;
