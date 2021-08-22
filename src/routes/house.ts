import express from 'express';
import House from '../models/house-model';

const router = express.Router();

// Show house
router.get('/:id', async (req, res) => {
  const house = await House.findOne(
    { id: req.params.id },
    'id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4'
  );
  if (house != null) {
    res.render('main/house.ejs', {
      title: house.title,
      description: house.description,
      data: house,
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
