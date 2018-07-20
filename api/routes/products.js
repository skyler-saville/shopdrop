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
var Product = require('../models/product').Product

/**
 * Validate Product ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Product id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Product id is valid. params = ', req.params)
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
//   console.log('Something is happening on products router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 * Products Collection (GET and POST)
 */
router.route('/products')
  .post(function (req, res) {
    console.log(req.body.address)
    console.log('POST on /products')
    var newResource = new Product()
    /*
      name
      size
      variation
      active
      upc
      associated_with
    */
    newResource.name = req.body.name // String (required)
    newResource.size = req.body.size // String
    newResource.variation = req.body.variation // String
    newResource.active = req.body.active // String (required)
    newResource.upc = req.body.upc // String (required)
    newResource.associated_with = req.body.associated_with // String (required)
    // save the product and check for errors
    newResource.save()
      .then(function () {
        console.log('save worked on POST') // first function
        res.status(201)
        res.json({ message: 'New product created!' })
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
  }) // end of POST product route

  .get(function (req, res) {
    console.log('GET on /products')
    Product.find(function (err, products) {
      if (err) {
        res.send(err)
      } else {
        res.json(products)
        res.status(200)
      }
    })
  }) // end of GET products routes

/**
 * Single Product (GET, PUT and DELETE)
 */
router.route('/products/:_id')
// get the product with that id (accessed at GET http://localhost:8080/api/products/:_id)
  .get(function (req, res) {
    console.log('GET on /products/', req.params._id)
    if (validResourceID(req, res)) {
      Product.findById(req.params._id, function (err, product) {
        if (err) throw err // res.send(err);
        res.json(product)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET products/restId route

  .put(function (req, res) {
    console.log('PUT on /products/', req.params._id)
    // use the product model to find the product we want
    if (validResourceID(req, res)) {
      Product.findById(req.params._id, function (err, product) {
        if (err) {
          res.send(err)
        } else {
          if (req.body.name) {
            // update product name
            location.name = req.body.name
          }
          if (req.body.size) {
            // update product size
            location.size = req.body.size
          }
          if (req.body.variation) {
            // update product variation
            location.variation = req.body.variation
          }
          if (req.body.active) {
            // update if product is active or not
            location.active = req.body.active
          }
          if (req.body.upc) {
            // update product upc
            location.upc = req.body.upc
          }
          if (req.body.associated_with) {
            // update associated brand _id
            location.associated_with = req.body.associated_with
          }
          // save the product and check for errors
          product.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Product updated!' })
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
      }) // end of POST product route
    } else {
      res.sendStatus(404)
    }
  }) // end of PUT /products/_id route

  .delete(function (req, res) {
    console.log('DELETE on /products/', req.params._id)
    if (validResourceID(req, res)) {
      Product.remove({
        _id: req.params._id
      }, function (err, product) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Successfully deleted the product' })
        }
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /products/_id route

/**
 * Export the router
 */
module.exports = router
