/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()

/**
 * Mongoose Stuff
 */
var mongoose = require('mongoose')
var Dropper = require('../../models/users/dropper').Dropper // still set variable to Dropper

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
// const dropperUp = require('../../middleware/userAuths').dropperUpAuth
// const guestUp = require('../../middleware/userAuths').guestUpAuth
const openGetAdminUp = require('../../middleware/userAuths').selfGetAdminUpAuth
// const openGetDropperUp = require('../../middleware/userAuths').selfGetDropperUpAuth
// const userIdOrVulcan = require('../../middleware/userAuths').userIdOrVulcanAuth

/**
 * Validate Dropper ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Dropper id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Dropper id is valid. params = ', req.params)
    return true
  } else {
    console.error('ID is not valid')
    return false
  }
}

/**
 * Users Collection (GET and POST)
 */
router.route('/users/droppers')
  .post(function (req, res) { // only vulcan or admin can create a NEW dropper
    console.log(req.body.address)
    console.log('POST on /users/droppers')
    var newResource = new Dropper()
    /**
     * -base user-
     * name.first
     * name.last
     * email
     * password
     * phone
     * -THIS user-
     * account_type (defaults to Dropper)
     * orders.current
     * orders.previous
     * orders.cancelled
     * invite_code.delivery
     */
    newResource.name.first = req.body.name.first // String (required)
    newResource.name.last = req.body.name.last // String (required)
    newResource.email = req.body.email // String (required)
    newResource.password = req.body.password // String
    newResource.phone = req.body.phone // String (required)
    // user specific datamembers
    // newResource.invite_code.delivery = req.body.invite_code.delivery // String
    // newResource.drivers_license.number = req.body.drivers_license.number // String
    // newResource.drivers_license.state = req.body.drivers_license.state // String

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

  .get(adminUp, function (req, res) { // only vulcan or admin can get ALL droppers
    console.log('GET on /users/droppers')
    // Dropper.find({ 'account_type': 'dropper' }, 'name.first name.last email phone', function (err, users) {
    Dropper.find({ 'account_type': 'dropper' }, 'name.first name.last email phone', function (err, users) {
      if (err) {
        res.send(err)
      } else {
        res.json(users)
        res.status(200)
      }
    })
  }) // end of GET users routes

/**
 * Single Dropper (GET, PUT and DELETE)
 */
router.route('/users/droppers/:_id')
// get the user with that id (accessed at GET http://localhost:8080/api/users/:_id)
  .get(openGetAdminUp, function (req, res) { // only self, vulcan or admin can get dropper by id
    console.log('GET on /users/droppers/', req.params._id)
    if (validResourceID(req, res)) {
      Dropper.findById(req.params._id, function (err, user) {
        if (err) throw err // res.send(err);
        res.json(user)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET users/restId route

  .put(openGetAdminUp, function (req, res) { // only self, vulcan or admin can update dropper by id
    console.log('PUT on /users/droppers/', req.params._id)
    // use the user model to find the user we want
    if (validResourceID(req, res)) {
      Dropper.findById(req.params._id, function (err, user) {
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
          if (req.body.phone) {
            // update phone number
            user.phone = req.body.phone
          }
          if (req.body.invite_code.delivery) {
            // update delivery invite code
            user.invite_code.delivery = req.body.invite_code.delivery
          }
          if (req.body.drivers_license.number) {
            // update delivery drivers license number
            user.drivers_license.number = req.body.drivers_license.number
          }
          if (req.body.drivers_license.state) {
            // update delivery drivers license state
            user.drivers_license.state = req.body.drivers_license.state
          }
          // save the user and check for errors
          user.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Dropper updated!' })
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

  .delete(adminUp, function (req, res) { // only vulcan or admin can delete a dropper from the database
    console.log('DELETE on /users/droppers/', req.params._id)
    if (validResourceID(req, res)) {
      Dropper.remove({
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
