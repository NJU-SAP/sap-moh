import { Router } from 'express';

const router = Router();

// prefix: /sap/moh/api/${...}
router.get('/index', (req, res) => {
  res.json([
    {
      busCount: 0,
      busSpeed: 0,
      pilgrimCount: 0,
      overralSpeed: 0
    }
  ]);
});

export default router;
