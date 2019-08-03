const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

// form for new session/log in
sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs')
})

sessions.post('/', (req, res) => {
User.findOne({username: req.body.username}, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser){ // if found user is undefined/null not found etc
      res.send('<a  href="/">Sorry, no user found </a>')
    } else { // user is found yay!
      // now let's check if passwords match
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser
        // redirect back to our home page
        res.redirect('/pets')
      } else { // passwords do not match
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/pets')
    })
})


module.exports = sessions
