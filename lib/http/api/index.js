import { Router } from 'express';

const router = Router();

router.get('/index', (req, res) => {
  res.json({ msg: 'Hello, sap-moh' });
});

export default router;
