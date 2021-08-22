import express from 'express';
import House from '../models/house-model';

const router = express.Router();

const numberItems = 9;
const paginationNumber = 5;

// Show catalog
router.get('/:page', async (req, res) => {
  const page = Number(req.params.page);
  const houses = await House.find()
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .exec();
  const count = await House.countDocuments().exec();
  const pages = Math.ceil(count / numberItems);
  if (page <= pages) {
    res.render('main/catalog.ejs', {
      title: 'Catálogo de Quartos e Apartamentos no Porto',
      description:
        'Consulte a nossa lista de quartos e apartamentos. Descubra um quarto ou apartamento a 50 passos de qualquer universidade.',
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    });
  }
});

router.get('/rooms/:page', async (req, res) => {
  const page = Number(req.params.page);
  const houses = await House.find({ type: 1 })
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .exec();
  const count = await House.countDocuments({ type: 1 }).exec();
  const pages = Math.ceil(count / numberItems);
  if (page <= pages) {
    res.render('main/catalog.ejs', {
      title: 'Catálogo de Quartos no Porto',
      description:
        'Consulte a nossa lista de quartos. Descubra um quarto a 50 passos de qualquer universidade.',
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/rooms',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    });
  }
});

router.get('/apartments/:page', async (req, res) => {
  const page = Number(req.params.page);
  const houses = await House.find({ type: 2 })
    .sort({ date: -1 })
    .skip(numberItems * page)
    .limit(numberItems)
    .exec();
  const count = await House.countDocuments({ type: 2 }).exec();
  const pages = Math.ceil(count / numberItems);
  if (page <= pages) {
    res.render('main/catalog.ejs', {
      title: 'Catálogo de Apartamentos no Porto',
      description:
        'Consulte a nossa lista de apartamentos. Descubra um apartamento a 50 passos de qualquer universidade.',
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages,
      url: '/catalog/apartments',
    });
  } else {
    res.status(404).render('main/error.ejs', {
      title: '404 - Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
      error: 404,
    });
  }
});

export = router;
