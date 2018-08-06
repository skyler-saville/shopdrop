/**
 * ShopDropDelivery.com
 * Adding dependencies below...
 */
let Keys
// Keys
if (process.env.TESTINGFORAPULSE) {
  // set keys with env keys
  Keys = require('./herokeys')
  console.log('herokeys being used')
} else {
  Keys = require('../../keys')
  console.log('keys being used')
}

const MONGOOSE_URI = Keys.mlab
const KEYBOARD_CAT = Keys.cat
const SECRET_TOKEN = Keys.tokenSecret

// Express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Custom Functions/Middleware
const localAvailable = require('./middleware/localAvailable').localAvailable

// CORS
const cors = require('cors')
app.use(cors())

// Mongoose
const mongoose = require('mongoose')

// JSON Web Token
// const jwt = require('jwt-simple')
const jwtAsync = require('jsonwebtoken')
// Custom Middleware for Authentication of JWTs
const verifyToken = require('./middleware/verifyJWT').verifyJWT
// const vulcanAuth = require('./middleware/pathsAuth').vulcan

// API Models
const BaseUser = require('./models/users/baseUser').Base

// API Routers
const contentRouter = require('./routes/content')
const homeContentRouter = require('./routes/home_content')
const brandsRouter = require('./routes/brands')
const locationsRouter = require('./routes/locations')
const ordersRouter = require('./routes/orders')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users/users') // no longer being used as the default
const adminRouter = require('./routes/users/admins')
const vulcanRouter = require('./routes/users/vulcans')
const deliveryRouter = require('./routes/users/droppers')
const shopperRouter = require('./routes/users/shoppers')
const guestRouter = require('./routes/users/guests')
const queriesRouter = require('./routes/queries')

// Passport
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// Environment Path
const path = require('path')
app.use(express.static(path.join(__dirname, ''))) // express.static(public)

// session and cookie middleware
app.use(cookieParser())
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// session cookie not created by default
app.use(session({
  secret: KEYBOARD_CAT,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

// Passport Local Strategies
passport.use(new LocalStrategy({
  usernameField: 'email',
  session: false
}, function (email, password, done) {
  BaseUser.findOne({email: email}).then(function (user) {
    if (!user) {
      console.log('no user found')
      return done
    }
    user.validatePassword(password, function (valid) {
      if (valid) {
        console.log('user is valid')
        return done(null, user)
      } else {
        console.log('user is not valid')
        return done(null, false)
      }
    })
  })
}))

// Express Router (aka app.use(app.router))
const router = express.Router()

// apply middleware BEFORE auth checks
app.use(homeContentRouter)
app.use(contentRouter)

// use Authentication Middleware on routes
app.use(verifyToken)

// from here on, the paths are protected against invalid tokens
// app.use(vulcanAuth)

// Routes
app.use(brandsRouter) // GET (guest - vulcan) ELSE (admin - vulcan)
app.use(locationsRouter) // GET (guest - vulcan) ELSE (admin - vulcan)
app.use(ordersRouter) // GET (guest - vulcan) ELSE (dropper - vulcan)
app.use(productsRouter) // GET (guest - vulcan) ELSE (admin - vulcan)
// User Type Routes
app.use(queriesRouter) // guest - vulcan (guestUpAuth)
app.use(deliveryRouter) // dropper - vulcan (dropperUpAuth) dropperSelfCRUD
app.use(shopperRouter) // dropper - vulcan (dropperUpAuth) shopperSelfCRUD
app.use(guestRouter) // dropper -vulcan (dropperUpAuth)
app.use(adminRouter) // admin - vulcan (adminUpAuth) adminSelfCRUD
app.use(usersRouter) // vulcan only (vulcanAuth)
app.use(vulcanRouter) // vulcan only (vulcanAuth) vulcanSelfCRUD

// Mount Base Router for API
app.use(router)

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   achieve the same functionality.
app.post('/login', function (req, res, next) {
  passport.authenticate('local',
    function (err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        return res.status(401).json({ error: 'The Email or Password was incorrect.' })
      } else {
        // user has authenticated correctly thus we create a JWT token
        // async
        const currUser = {
          _id: user._id,
          account_type: user.account_type,
          name: user.name,
          email: user.email,
          phone: user.phone,
          orders: user.orders,
          address: user.address,
          _isActive: user._isActive
        }

        jwtAsync.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          user: currUser
        }, SECRET_TOKEN,
        (err, token) => {
          if (err) {
            res.status(401).json({error: 'The Callback function failed on token signing'})
          } else {
            console.log('sending cookie to browser')
            // send Token in cookie
            // test localstorage options
            if (localAvailable()) {
              // send token to localstorage
              console.log('local storage is available')
              localStorage.setItem('Authorization', token)
            } else {
              // send Authorization Bearer Header
              console.log('local storage not available')
              res.setHeader('Authorization', 'Bearer ' + token)
            }
            // Always send a cookie
            res.cookie('Authorization', token)
            res.json({
              message: 'Login Credentials Excepted. Welcome Back, ' + user.name.first + '!',
              user: currUser,
              token: token
            })
          }
        })
      } // end of Passport Authentication
    })(req, res, next)
})

// Configure Environment Port
app.set('port', (process.env.PORT || 3000))

// mLab Connection
mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('There was an error with the connection')
    throw err
  } else {
    // do nothing
  }
})

const db = mongoose.connection
// successful connection to db
db.on('connected', function () {
  console.log('\nMongoose default connection open')
})
// error on db connection
db.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})
// disconnected from db
db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

db.once('open', function () {
  // we're connected
  console.log('The database is connected and ready')
}) // end of db.once

// middleware to use for all requests
router.use(function (req, res, next) {
  if (req.user) {
    console.log('Welcome back', req.user.email)
  }
  console.log('Something is happening on main router')
  next() // make sure we go to the next routes and don't stop here
})

router.get('/', function (req, res) {
  if (req.user) {
    res.json({ message: 'Welcome to the ShopDrop API!', user: req.user.name.first })
  } else {
    res.json({message: 'Please log in to see the API'})
  }
})

/**
  * Use environment port and listen
  */
// app.listen(app.get('port'), function (err) {
//   if (err) {
//     console.log('there was an error')
//   } else {
//     console.log('Things should be working now')
//   }
// }).on('error', function (err) {
//   console.log(err)
// })

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
