import express from 'express';
import House from '../models/house-model';

const router = express.Router();

// Show catalog
router.get('/:page', async (req, res) => {
  const numberItems = 9;
  const page = Number(req.params.page);
  const houses = await House.find()
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems);
  const count = await House.countDocuments();
  const pages = Math.ceil(count / numberItems);
  if (page < pages) {
    res.render('main/catalog.ejs', {
      data: houses,
      current: page,
      pages,
      url: '/catalog',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      error: 404,
      description: 'A página solicitada não foi encontrada.',
    });
  }
});

router.get('/rooms/:page', async (req, res) => {
  const numberItems = 9;
  const paginationNumber = 5;
  const page = Number(req.params.page);
  const houses = await House.find({ type: 1 })
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems);
  const count = await House.countDocuments({ type: 1 });
  const pages = Math.ceil(count / numberItems);
  if (page < pages) {
    res.render('main/catalog.ejs', {
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/rooms',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      error: 404,
      description: 'A página solicitada não foi encontrada.',
    });
  }
});

router.get('/apartments/:page', async (req, res) => {
  const numberItems = 9;
  const paginationNumber = 5;
  const page = Number(req.params.page);
  const houses = await House.find({ type: 2 })
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems);
  const count = await House.countDocuments({ type: 2 });
  const pages = Math.ceil(count / numberItems);
  if (page < pages) {
    res.render('main/catalog.ejs', {
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/apartments',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      error: 404,
      description: 'A página solicitada não foi encontrada.',
    });
  }
});

export = router;
