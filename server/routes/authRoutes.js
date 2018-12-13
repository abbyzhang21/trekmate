const express = require('express');
const route = express.Router();
const Users = require('../db/models/users.js')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');


passport.serializeUser( (user, done) => {
  console.log('serializeUser', user)
  done(null, {
    email: user.email
  })
})

passport.deserializeUser( (user, done) => {
  console.log('deserializing User', user)
  Users
    .where({email: user.email})
    .fetch()
    .then( user => {
      user = user.toJSON();
      console.log('user in deserialize user', user)
      done(null, user)
    })
    .catch( err => {
      console.log('err', err)
    })
})

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
  console.log('local is being called')
  Users
    .where({email})
    .fetch()
    .then( user => {
      console.log('user in local strategy', user)
      user = user.toJSON();
      // if (user.password === password) {
        //   done(null, user )
        // } else {
          //   done(null, false)
          // }
          console.log('authRoutes.js passport.use login user.ToJSON', user)
          bcrypt.compare(password, user.password)
          .then( res => {
            console.log('authRoutes.js passport.use login after bcrypt!!!\n', res)
            
            if (res) {
              console.log('authRoutes.js passport.use login after success!!!!\n')
              done(null, user)
          } else {
            console.log('authRoutes.js passport.use login after failure!!!\n')
            done(null, false)
          }
        })
    })
    .catch( err => {
      done(null, false)
    })
}))


const SALT_ROUND = 12

route.post('/login/register', (req, res) => {

  const { email, password, first_name, last_name } = req.body;

  bcrypt.genSalt(12)
    .then( salt => {
      console.log('salt', salt)
      return bcrypt.hash(password, salt)
    })
    .then( hash => {
      console.log('hash', hash)
      return Users 
                .forge({email, password: hash, first_name, last_name})
                .save()
    })
    .then( user => {
      user = user.toJSON()
      res.json(user) // Never send the entire user object back to client! It has their password!
      // res.sendStatus(200)
      // res.redirect('/api/auth/secret')
    })
    .catch( err => {
      console.log('err', err)
      res.json(err)
      // res.sendStatus(500)
    })
})

route.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
  console.log('authRoutes.js POST/login!!!')
  // grab the user on record
  // compare req.body.password to password on record

  res.send('YAY IM IN!!!!')
})

route.get('/logout', (req, res) => {
  console.log('auth logout!!!')
  req.logout()
  console.log('auth logout, after logout!!')
  res.redirect('/')
  console.log('auth logout, after redirect!!')
})


module.exports = route