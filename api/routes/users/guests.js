/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()

/**
 * Mongoose Stuff
 */
var mongoose = require('mongoose')
var Guest = require('../../models/user').Guest

/**
 * Custom Authorization Middleware
 *
 * vulcanOnlyAuth: vulcanOnly,
 * adminUpAuth: adminUp,
 * dropperUpAuth: dropperUp,
 * guestUpAuth: guestUp,
 * selfGetAdminUpAuth: openGetAdminUp,
 * selfGetDropperUpAuth: openGetDropperUp,
 * userIdOrVulcanAuth: userIdOrVulcan
 *
 */
// const vulcanUp = require('../../middleware/userAuths').vulcanOnlyAuth
// const vulcanOnly = require('../../middleware/userAuths').vulcanOnlyAuth
const adminUp = require('../../middleware/userAuths').adminUpAuth
// const idOrVulcan = require('../../middleware/userAuths').userIdOrVulcanAuth
const dropperUp = require('../../middleware/userAuths').dropperUpAuth
// const guestUp = require('../../middleware/userAuths').guestUpAuth
// const openGetAdminUp = require('../../middleware/userAuths').selfGetAdminUpAuth
// const openGetDropperUp = require('../../middleware/userAuths').selfGetDropperUpAuth
// const userIdOrVulcan = require('../../middleware/userAuths').userIdOrVulcanAuth

/**
 * Validate Guest ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Guest id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Guest id is valid. params = ', req.params)
    return true
  } else {
    console.error('ID is not valid')
    return false
  }
}

/**
 * Middleware.use
 */
// router.use(function (req, res, next) {
//   // do logging
//   console.log('Something is happening on guests router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 * Users Collection (GET and POST)
 */
router.route('/users/guests')
  .post(function (req, res) { // open this up so anyone can make a guest
    console.log(req.body.address)
    console.log('POST on /users')
    var newResource = new Guest()
    /**
     * -base user-
     * name.first
     * name.last
     * email
     * phone
     * -THIS user-
     * address.street
     * address.apt
     * address.city
     * address.state
     * address.zip
     * address.instructions
     * current_order (objectId)
     *
     */
    newResource.name.first = req.body.name.first // String (required)
    newResource.name.last = req.body.name.last // String (required)
    newResource.email = req.body.email // String (required)
    newResource.password = req.body.password // String
    newResource.phone = req.body.phone // String (required)
    // user specific datamembers
    newResource.address.street = req.body.address.street // String
    newResource.address.apt = req.body.address.apt // String
    newResource.address.city = req.body.address.city // String
    newResource.address.state = req.body.address.state // String (required)
    newResource.address.zip = req.body.address.zip // String (required)
    newResource.address.instructions = req.body.address.instructions // String

    // save the user and check for errors
    newResource.save()
      .then(function () {
        console.log('save worked on POST') // first function
        res.status(201)
        res.json({ message: 'New user created!' })
        console.log('sent res.json on post')
      }, function (err) { // error object is way too big to send to the client
        if (err.errors) { // check if there are errors from Mongoose
          var messages = {}
          for (var e in err.errors) {
            messages[e] = err.errors[e].message
          }
          res.status(422).json(messages) // sendStatus will fill in body... which we don't want
          // will return {'name': 'path is required'}
        } else {
          // do something if there are no validation errors
          console.log('something crazy happened', err)
          res.status(500)
          // as far as the client is concerned, this is all that needs to be seen
        }
        console.log("save didn't work", err.errors) // err.errors is an object within the err response
        res.status(422)
      })
  }) // end of POST user route

  .get(dropperUp, function (req, res) { // vulcan, admin and dropper can see ALL guests
    console.log('GET on /users/guests')
    Guest.find({ 'account_type': 'guest' },
      'name.first name.last email phone address.street address.apt address.city address.state address.zip address.instructions',
      function (err, users) {
        if (err) {
          res.send(err)
        } else {
          res.json(users)
          res.status(200)
        }
      })
  }) // end of GET users routes

/**
 * Single Guest (GET, PUT and DELETE)
 */
router.route('/users/guests/:_id')
// get the user with that id (accessed at GET http://localhost:8080/api/users/:_id)
  .get(dropperUp, function (req, res) {
    console.log('GET on /users/guests/', req.params._id)
    if (validResourceID(req, res)) {
      Guest.findById(req.params._id, function (err, user) {
        if (err) throw err // res.send(err);
        res.json(user)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET users/restId route

  .put(dropperUp, function (req, res) {
    console.log('PUT on /users/guests/', req.params._id)
    // use the user model to find the user we want
    if (validResourceID(req, res)) {
      Guest.findById(req.params._id, function (err, user) {
        if (err) {
          res.send(err)
        } else {
          if (req.body.name.first) {
            // change the users first name
            user.name.first = req.body.name.first
          }
          if (req.body.name.last) {
            // change users last name
            user.name.last = req.body.name.last
          }
          if (req.body.address.street) {
            // update street address
            user.address.street = req.body.address.street
          }
          if (req.body.address.apt) {
            // update apt/building number
            user.address.apt = req.body.address.apt
          }
          if (req.body.address.city) {
            // update the city
            user.address.city = req.body.address.city
          }
          if (req.body.address.state) {
            // update the state
            user.address.state = req.body.address.state
          }
          if (req.body.address.zip) {
            // update zipcode
            user.address.zip = req.body.address.zip
          }
          if (req.body.email) {
            // update users email ... not sure how to implement this
            // since this is basically the users id in the system
            user.email = req.body.email
          }
          if (req.body.phone) {
            // update phone number
            user.phone = req.body.phone
          }
          // save the user and check for errors
          user.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Guest updated!' })
              console.log('sent res.json on post')
            }, function (err) { // error object is way too big to send to the client
              if (err.errors) { // check if there are errors from Mongoose
                var messages = {}
                for (var e in err.errors) {
                  messages[e] = err.errors[e].message
                }
                res.status(422).json(messages) // sendStatus will fill in body... which we don't want
                // will return {'name': 'path is required'}
              } else {
                // do something if there are no validation errors
                console.log('something crazy happened', err)
                res.status(500)
                // as far as the client is concerned, this is all that needs to be seen
              }
              console.log('save did not work', err.errors) // err.errors is an object within the err response
              res.status(422)
            })
        }
      }) // end of POST user route
    } else {
      res.sendStatus(404)
    }
  }) // end of PUT /users/_id route

  .delete(adminUp, function (req, res) {
    console.log('DELETE on /users/guests/', req.params._id)
    if (validResourceID(req, res)) {
      Guest.remove({
        _id: req.params._id
      }, function (err, user) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Successfully deleted the user' })
        }
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /users/_id route

/**
 * Export the router
 */
module.exports = router
