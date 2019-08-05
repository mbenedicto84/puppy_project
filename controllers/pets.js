const express = require('express');
const router = express.Router();
const Pets = require('../models/pets.js');
const seedData = require('../models/seed_data.js');

router.get('/seed', (req, res) => {
    Pets.create(seedData, (err, data) => {
      console.log(seedData);
      console.log(err);

        res.redirect('/pets')
    });
});
router.get('/', (req, res) => {
    Pets.find({}, (error, allPets) => {
        res.render('index.ejs',{
            pets:allPets,
            currentUser: req.session.currentUser
        });
    })
});
router.put('/:id', (req, res) => {
  console.log('hello');
    Pets.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, updatedModel) => {
      console.log(updatedModel)
        res.redirect('/pets');

    })
});


router.get('/new', (req, res) => {
  res.render('new.ejs',{
      currentUser: req.session.currentUser,

  });

})

router.put('/like/:id', (req, res)=>{

    Pets.findByIdAndUpdate(req.params.id,{$inc:{ likes: 1 }}, (error, likePet)=>{


    console.log(likePet);
         res.redirect('/pets');
    });
})




router.delete('/:id', (req, res) => {
    Pets.findByIdAndRemove(req.params.id, (error, deletedPets) => {
        res.redirect('/pets')
    })
});

router.get('/:id/edit', (req, res) => {
    Pets.findById(req.params.id, (error, foundPets) => {
        res.render(
            'edit.ejs',
            {
              currentUser: req.session.currentUser,
                pets:foundPets
            }
        );
    });
});



router.get('/:id', (req, res) => {
    Pets.findById(req.params.id, (err, foundPets) => {
        res.render('show.ejs',{
            pets:foundPets,
            currentUser: req.session.currentUser
        });
    });
});

router.post('/', (req, res) => {

    Pets.create(req.body, (error, createdPets) => {
        res.redirect('/pets');
    });
});

module.exports = router;
