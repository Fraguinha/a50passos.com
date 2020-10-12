import express from 'express';
import Meta from '../models/meta-model';

const router = express.Router();

// Show homepage
router.get('/', async (req, res) => {
  const meta = await Meta.findOne();
  res.render('index.ejs', {
    meta,
  });
});

export = router;
