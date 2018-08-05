/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()

/**
 * Mongoose Stuff
 */
var mongoose = require('mongoose')
var Admin = require('../../models/users/admin').Admin // still set variable to Admin

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
const vulcanOnly = require('../../middleware/userAuths').vulcanOnlyAuth
const adminUp = require('../../middleware/userAuths').adminUpAuth
const idOrVulcan = require('../../middleware/userAuths').userIdOrVulcanAuth
// const dropperUp = require('../../middleware/userAuths').dropperUpAuth
// const guestUp = require('../../middleware/userAuths').guestUpAuth
// const openGetAdminUp = require('../../middleware/userAuths').selfGetAdminUpAuth
// const openGetDropperUp = require('../../middleware/userAuths').selfGetDropperUpAuth
// const userIdOrVulcan = require('../../middleware/userAuths').userIdOrVulcanAuth

/**
 * Validate Admin ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Admin id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Admin id is valid. params = ', req.params)
    return true
  } else {
    console.error('ID is not valid')
    return false
  }
}

/**
 * Users Collection (GET and POST)
 */
router.route('/users/admins')
  .post(function (req, res) { // only vulcan can CREATE a new ADMIN
    console.log(req.body.address)
    console.log('POST on /users/admins')
    var newResource = new Admin()
    /**
     * -base user-
     * name.first
     * name.last
     * email
     * password
     * phone
     * -THIS user-
     * account_type (**defaults to Admin)
     * invite_code.admin (user submitted)
     * invite_code.delivery (**defaults to "IWannaDropShop")
     *
     */
    newResource.name.first = req.body.name.first // String (required)
    newResource.name.last = req.body.name.last // String (required)
    newResource.email = req.body.email // String (required)
    newResource.password = req.body.password // String
    newResource.phone = req.body.phone // String (required)

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

  .get(adminUp, function (req, res) {
    console.log('GET on /users/admins')
    // Admin.find({ 'account_type': 'admin' }, 'name.first name.last email phone invite_code.admin', function (err, users) {
    Admin.find({ 'account_type': 'admin' }, function (err, users) {
      if (err) {
        res.send(err)
      } else {
        res.json(users)
        res.status(200)
      }
    })
  }) // end of GET users routes

/**
 * Single Admin (GET, PUT and DELETE)
 */
router.route('/users/admins/:_id')
// get the user with that id (accessed at GET http://localhost:8080/api/users/:_id)
  .get(idOrVulcan, function (req, res) { // only self or vulcan can get admin by id
    console.log('GET on /users/admins/', req.params._id)
    if (validResourceID(req, res)) {
      Admin.findById(req.params._id,
        'name.first name.last email phone account_type invite_code.admin',
        function (err, user) {
          if (err) throw err // res.send(err);
          res.json(user)
        })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET users/restId route

  .put(idOrVulcan, function (req, res) { // only self or vulcan can update admin by id
    console.log('PUT on /users/admins/', req.params._id)
    // use the user model to find the user we want
    if (validResourceID(req, res)) {
      Admin.findById(req.params._id, function (err, user) {
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
            // update street address
            user.phone = req.body.phone
          }
          if (req.body.invite_code.admin) {
            // update apt/building number
            user.invite_code.admin = req.body.invite_code.admin
          }
          if (req.body.invite_code.delivery) {
            // update delivery instructions
            user.invite_code.delivery = req.body.invite_code.delivery
          }
          // save the user and check for errors
          user.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Admin updated!' })
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

  .delete(vulcanOnly, function (req, res) { // only a vulcan can delete an admin from the database
    console.log('DELETE on /users/admins/', req.params._id)
    if (validResourceID(req, res)) {
      if (req.authData.user.account_type === 'vulcan') {
        Admin.remove({
          _id: req.params._id
        }, function (err, user) {
          if (err) {
            res.send(err)
          } else {
            res.json({ message: 'Successfully deleted the user' })
          }
        })
      } else {
        // self setting self to _isActive = false
        Admin.findOneAndUpdate({_id: req.params._id}, {$set: {_isActive: false}}, {new: true}, function (err, user) {
          if (err) {
            res.status(500)
              .json({
                error: 'Something went wrong on data change',
                reason: 'Setting Admin _isActive failed'
              })
          } else {
            res.json(user)
          }
        })
      }
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /users/_id route

/**
 * Export the router
 */
module.exports = router
