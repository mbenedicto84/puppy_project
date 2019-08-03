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
      console.log("Hello");
      console.log(allPets);
        res.render('index.ejs',{
            pets:allPets,
            currentUser: req.session.currentUser
        });
    })
});


router.get('/new', (req, res) => {
    res.render('new.ejs');
});


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
                pets:foundPets
            }
        );
    });
});

router.put('/:id', (req, res) => {

    Pets.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/pets');
    })
});


router.get('/:id', (req, res) => {
    Pets.findById(req.params.id, (err, foundPets) => {
        res.render('show.ejs',{
            pets:foundPets
        });
    });
});

router.post('/', (req, res) => {

    Pets.create(req.body, (error, createdPets) => {
        res.redirect('/pets');
    });
});

module.exports = router;
