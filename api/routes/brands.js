/**
 * PRODUCTS ROUTER
 * CRUD methods for products
 */

/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()

/**
 * Mongoose Stuff
 */
var mongoose = require('mongoose')
var Brand = require('../models/brand').Brand

/**
 * Validate Brand ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Brand id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Brand id is valid. params = ', req.params)
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
//   console.log('Something is happening on brands router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 * Brands Collection (GET and POST)
 */
router.route('/brands')
  .post(function (req, res) {
    console.log(req.body.address)
    console.log('POST on /brands')
    var newResource = new Brand()
    /**
     * Brand Schema
     *  name
     *  api URI
     *  website URL
     *  active
     *  products
    */
    newResource.name = req.body.name // String (required)
    if (req.body.api) {
      newResource.api = req.body.api // String
    }
    if (req.body.active) {
      newResource.active = req.body.active // String (required)
    }
    if (req.body.website) {
      newResource.website = req.body.website // String
    }
    if (req.body.products) {
      newResource.products = req.body.products // String (required)
    }
    // save the brand and check for errors
    newResource.save()
      .then(function () {
        console.log('save worked on POST') // first function
        res.status(201)
        res.json({ message: 'New brand created: ' + newResource.name })
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
  }) // end of POST brand route

  .get(function (req, res) {
    if (req.authData) {
      console.log('req.authData ', JSON.stringify(req.authData))
    } else {
      console.log('no authData found')
    }
    console.log('GET on /brands')
    Brand.find(function (err, brands) {
      if (err) {
        res.send(err)
      } else {
        res.json(brands)
      }
    })
  }) // end of GET brands routes

/**
 * Single Brand (GET, PUT and DELETE)
 */
router.route('/brands/:_id')
// get the brand with that id (accessed at GET http://localhost:8080/api/brands/:_id)
  .get(function (req, res) {
    console.log('GET on /brands/', req.params._id)
    if (validResourceID(req, res)) {
      Brand.findById(req.params._id, function (err, brand) {
        if (err) throw err // res.send(err);
        res.json(brand)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET brands/restId route

  .put(function (req, res) {
    console.log('PUT on /brands/', req.params._id)
    // use the brand model to find the brand we want
    if (validResourceID(req, res)) {
      Brand.findById(req.params._id, function (err, brand) {
        if (err) {
          res.send(err)
        } else {
          if (req.body.name) {
            // update brand name
            brand.name = req.body.name
          }
          if (req.body.api) {
            // update brand api
            brand.api = req.body.api
          }
          if (req.body.website) {
            // update brand website
            brand.website = req.body.website
          }
          if (req.body.active) {
            // set brand activated/deactivated
            brand.active = req.body.active
          }
          if (req.body.products) {
            // update products array
            brand.products = req.body.products
          }
          // save the brand and check for errors
          brand.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Brand updated!' })
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
      }) // end of POST brand route
    } else {
      res.sendStatus(404)
    }
  }) // end of PUT /brands/_id route

  .delete(function (req, res) {
    console.log('DELETE on /brands/', req.params._id)
    if (validResourceID(req, res)) {
      Brand.remove({
        _id: req.params._id
      }, function (err, brand) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Successfully deleted the brand' })
        }
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /brands/_id route

/**
 * Export the router
 */
module.exports = router
