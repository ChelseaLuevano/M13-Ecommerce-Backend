const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  })
  .then((categories) => res.json(categories))

  .catch((err) => res.status(500).json(err))
    // try{
    //   const categoryData = await Category.findAll({
    //     include: [
    //       {
    //       model: Product,
    //       attributes: ['id', 'product_name', 'price', 'stock'],
    //       through: {
    //         attributes: []
    //       },
    //       as: 'products'
    //     }
    //   ]});
      
    //   res.status(200).json(categoryData);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      where: {
            id: req.params.id,
          }, 
      include: [Product]
    });

  if (!categoryData) {
    res.status(404).json({message: 'No category found with this ID.'});
    return;
  }

  res.status(200).json(categoryData);  
  
  } catch (err) {
    res.status(500).json(err);
   console.log(err);
  }

  // Category.findOne({ 
  //   where: {
  //     id: req.params.id,
  //   }, 
  //   include: [Product]
  // })
  // .then((categories) => res.json(categories))

  // .catch((err) => res.status(400).json(err))
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

  if (!categoryData) {
    res.status(404).json({message: 'No category found with this ID.'})
    return;
  }

  res.status(200).json(categoryData);  
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
