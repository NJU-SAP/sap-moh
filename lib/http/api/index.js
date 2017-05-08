import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}
router.get('/index', (req, res) => {
  res.json({ msg: 'Hello, sap-moh' });
});

export default router;
