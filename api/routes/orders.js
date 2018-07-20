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
var Order = require('../models/order').Order

/**
 * Validate Order ID
 *
 */
function validResourceID (req, res) {
  console.log('params = ', req.params)
  if (req.params === undefined) {
    console.log('req.body', req.params)
  }
  if (mongoose.Types.ObjectId.isValid(req.params.restID)) {
    console.log('Order id is valid. params = ', req.params)
    return true
  } else if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    console.log('Order id is valid. params = ', req.params)
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
//   console.log('Something is happening on orders router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 * Orders Collection (GET and POST)
 */
router.route('/orders')
  .post(function (req, res) {
    console.log(req.body.address)
    console.log('POST on /orders')
    var newResource = new Order()
    /*
      ordered_by
      dropped_by
      active
      nickname
      status
      items
      order_qty
      date_created
    */
    newResource.ordered_by = req.body.ordered_by // Schema.Types.ObjectId
    newResource.dropped_by = req.body.dropped_by // Schema.Types.ObjectId
    newResource.active = req.body.active // Boolean
    newResource.nickname = req.body.nickname // String
    newResource.status = req.body.status // String
    newResource.items = req.body.items // Schema.Types.ObjectId array
    newResource.order_qty = req.body.order_qty // Number
    newResource.date_created = req.body.date_created // Date
    // save the order and check for errors
    newResource.save()
      .then(function () {
        console.log('save worked on POST') // first function
        res.status(201)
        res.json({ message: 'New order created!' })
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
  }) // end of POST order route

  .get(function (req, res) {
    console.log('GET on /orders')
    Order.find(function (err, orders) {
      if (err) {
        res.send(err)
      } else {
        res.json(orders)
        res.status(200)
      }
    })
  }) // end of GET orders routes

/**
 * Single Order (GET, PUT and DELETE)
 */
router.route('/orders/:_id')
// get the order with that id (accessed at GET http://localhost:8080/api/orders/:_id)
  .get(function (req, res) {
    console.log('GET on /orders/', req.params._id)
    if (validResourceID(req, res)) {
      Order.findById(req.params._id, function (err, order) {
        if (err) throw err // res.send(err);
        res.json(order)
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of GET orders/restId route

  .put(function (req, res) {
    console.log('PUT on /orders/', req.params._id)
    // use the order model to find the order we want
    if (validResourceID(req, res)) {
      Order.findById(req.params._id, function (err, order) {
        if (err) {
          res.send(err)
        } else {
          if (req.body.dropper_assigned) {
            // update delivery person _id
            location.dropper_assigned = req.body.dropper_assigned
          }
          if (req.body.nickname) {
            // update order nickname
            location.nickname = req.body.nickname
          }
          if (req.body.active) {
            // set active/not active
            location.active = req.body.active
          }
          if (req.body.status) {
            // set order status (from accepted list)
            location.status = req.body.status
          }
          if (req.body.known_items) {
            // update array of known items on order
            location.known_items = req.body.known_items
          }
          if (req.body.unknown_items) {
            // update array of unknown items on order
            location.unknown_items = req.body.unknown_items
          }
          if (req.body.order_qty) {
            // update order qty
            location.order_qty = req.body.order_qty
          }
          if (req.body.date_created) {
            // update created date
            location.date_created = req.body.date_created
          }
          if (req.body.order_number) {
            // update order number (not sure how to do this correctly)
            location.order_number = req.body.order_number
          }
          // save the order and check for errors
          order.save()
            .then(function () {
              console.log('save worked on PUT') // first function
              res.status(201)
              res.json({ message: 'Order updated!' })
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
      }) // end of POST order route
    } else {
      res.sendStatus(404)
    }
  }) // end of PUT /orders/_id route

  .delete(function (req, res) {
    console.log('DELETE on /orders/', req.params._id)
    if (validResourceID(req, res)) {
      Order.remove({
        _id: req.params._id
      }, function (err, order) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Successfully deleted the order' })
        }
      })
    } else {
      res.sendStatus(404)
    }
  }) // end of DELETE /orders/_id route

/**
 * Export the router
 */
module.exports = router
