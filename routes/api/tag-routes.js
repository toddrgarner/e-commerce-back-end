const router = require('express').Router();
//const { json } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // Make sure to include its associated Product data
  Tag.findAll({
      include: [
        { 
          model: Product, 
          through: ProductTag,
        }]
    })
    .then(dbTagData => res.json(dbTagData))
      .catch (err => {
        console.log(err);
        res.status(500).json(err);
      });
   });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag
      }]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
     }
     res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
 });

router.post('/', (req, res) => {
  // create a new tag
    Tag.create(req.body),
      .then((dbTagData) => res.json(dbTagData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;