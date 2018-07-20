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
var Location = require('../models/location').Location

/**
 * Validate Location ID
 * -- also validate
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Location id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Location id is valid. params = ', req.params)
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
//   console.log('Something is happening on locations router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 * Locations Collection (GET and POST)
 */
router.route('/locations')
  .post(function (req, res) {
    console.log(req.body.address)
    console.log('POST on /locations')
    var newResource = new Location()
    /*
      name
      phone
      address.street
      address.city
      address.state
      address.zip
      website -if
      address.apt -if
      instructions -if
      associated_brands -if
    */
    console.log('name', req.body.name)
    console.log('phone', req.body.phone)
    console.log('address.street', req.body.address.street)
    console.log('address.city', req.body.address.city)
    console.log('address.state', req.body.address.state)
    console.log('address.zip', req.body.address.zip)
    console.log('address.apt', req.body.address.apt)
    console.log('website', req.body.address.website)
    console.log('instructions', req.body.address.instructions)
    console.log('associated_brands', req.body.address.associated_brands)
    newResource.name = req.body.name
    newResource.phone = req.body.phone
    newResource.address.street = req.body.address.street
    newResource.address.city = req.body.address.city
    newResource.address.state = req.body.address.state
    newResource.address.zip = req.body.address.zip

    if (req.body.website) {
      newResource.website = req.body.website
    }
    if (req.body.address.apt) {
      newResource.address.apt = req.body.address.apt
    }
    if (req.body.instructions) {
      newResource.instructions = req.body.instructions
    }
    if (req.body.associated_brands) {
      newResource.associated_brands = req.body.associated_brands
    }

    // save the location and check for errors
    newResource.save()
      .then(function () {
        console.log('save worked on POST') // first function
        res.status(201)
        res.json({ message: 'New location created!' })
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
  }) // end of POST location route

  .get(function (req, res) {
    console.log('GET on /locations')
    Location.find(function (err, locations) {
      if (err) {
        res.send(err)
      } else {
        res.json(locations)
        res.status(200)
      }
    })
  }) // end of GET locations routes

/**
 * Single Location (GET, PUT and DELETE)
 */
router.route('/locations/:_id')
// get the location with that id (accessed at GET http://localhost:8080/api/locations/:_id)
  .get(function (req, res) {
    console.log('GET on /locations/', req.params._id)
    if (validResourceID(req, res)) {
      Location.findById(req.params._id, function (err, location) {
        if (err) throw err // res.send(err);
        res.json(location)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET locations/restId route

  .put(function (req, res) {
    console.log('PUT on /locations/', req.params._id)
    // use the location model to find the location we want
    if (validResourceID(req, res)) {
      Location.findById(req.params._id, function (err, location) {
        if (err) {
          res.send(err)
        } else {
          if (req.body.name) {
            // update store name
            location.name = req.body.name
          }
          if (req.body.phone) {
            // update store phone number
            location.phone = req.body.phone
          }
          if (req.body.address.street) {
            // update store street address
            location.address.street = req.body.address.street
          }
          if (req.body.address.city) {
            // update store city
            location.address.city = req.body.address.city
          }
          if (req.body.address.state) {
            // update store state
            location.address.state = req.body.address.state
          }
          if (req.body.address.zip) {
            // update store zipcode
            location.address.zip = req.body.address.zip
          }
          if (req.body.website) {
            // update store website
            location.website = req.body.website
          }
          if (req.body.address.apt) {
            // update store apt/building number
            location.address.apt = req.body.address.apt
          }
          if (req.body.instructions) {
            // update store specific instructions
            location.instructions = req.body.instructions
          }
          if (req.body.associated_brands) {
            // update array of associated brands
            location.associated_brands = req.body.associated_brands
          }
          // save the location and check for errors
          location.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Location updated!' })
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
      }) // end of POST location route
    } else {
      res.sendStatus(404)
    }
  }) // end of PUT /locations/_id route

  .patch(function (req, res) {
    // check if there is a query string first
    if (req.query) {
      console.log('Location Query: ', req.query)
      // check for which type of query it is, then update the single data member on the document
      if (req.query.name) {
        // update the name
        console.log('Location Query: ', req.query.name)
      } else if (req.query.website) {
        // update website
        console.log('Location Query: ', req.query.website)
      } else if (req.query.phone) {
        // update the phone number
        console.log('Location Query: ', req.query.phone)
      } else if (req.query.street) {
        // update JUST the street part of the address
        console.log('Location Query: ', req.query.street)
      } else if (req.query.city) {
        // update the city
        console.log('Location Query: ', req.query.city)
      } else if (req.query.state) {
        // update the state
        console.log('Location Query: ', req.query.state)
      } else if (req.query.zip) {
        // update the zip
        console.log('Location Query: ', req.query.zip)
      } else if (req.query.instructions) {
        // update the instructions
        console.log('Location Query: ', req.query.instructions)
      } else {
        // patch is on the associated_brands array... push the new _id into the existing array
        console.log('Location Query: ', req.query.associated_brands)
      }
    } else {
      res.sendStatus(404)
    }
  })

  .delete(function (req, res) {
    console.log('DELETE on /locations/', req.params._id)
    if (validResourceID(req, res)) {
      Location.remove({
        _id: req.params._id
      }, function (err, location) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Successfully deleted the location' })
        }
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /locations/_id route

/**
 * Export the router
 */
module.exports = router
