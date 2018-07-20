/**
 * Custom Queries that interact with different API's
 */

/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()
// walmart API
var _key = '&apiKey=' + require('../keys').walmartKey
var uri = require('../keys').walmartURI
// upcDatabase API
var _upcKey = require('../keys').upcDBKey
var _upcUri = require('../keys').upcDBURI
// fetch API npm package
const fetch = require('node-fetch')

/**
 * Middleware.use
 */
// router.use(function (req, res, next) {
//   // do logging
//   console.log('Something is happening on queries router')
//   next() // make sure we go to the next routes and don't stop here
// })

/**
 *  /api/queries/search ** WORKING **
 *  Used as a pre-cursor to adding items to the database...
 *  to get the UPC or itemId THEN use a secondary search to get the important information
 */
router.route('/queries/search')
  .get(function (req, res) {
    var _searchURI = uri + '/search?'
    var _query = 'query=' + req.query.query // I am sending in these values (that just happen to match the parent API)
    var _format = '&format=json'
    var _categoryId = '&categoryId=' + req.query.categoryId

    console.log('GET on /queries/search')
    if (req.query.query) {
    // if no categoryId passed in, set to empty string
      if (!req.query.categoryId) {
        _categoryId = ''
      }
      // use fetch api to get the data from the walmart api
      // _searchURI + _query + _format + _categoryId
      fetch(_searchURI + _query + _format + _categoryId + _key)
        .then(function (res) {
          return res.json()
        })
        .then(function (result) {
        /**
         * query  (result.query)
         * totalResults (result.totalResults)
         * items  (result.items)
         * - itemId (result.items[0].itemId)
         *
         */
          console.log('result.items.length =', result.items.length)
          console.log('result.numItems =', result.numItems)
          // remove great value
          var nonGeneric = {query: result.query, nonGenericItems: 0, genericItemsRemoved: 0, items: {}}
          var nonGenericCount = 0
          for (var i = 0; i < result.numItems; i++) {
            //
            var walmartCheck = result.items[i].name.search('Great Value')
            if (walmartCheck !== -1) {
              console.log('Great Value Found: ', result.items[i].name)
              console.log(result.items[i].name.search('Great Value'))
            } else {
              console.log('Name Brand Found!', result.items[i].name)
              // nonGeneric.items[nonGenericCount] =   result.items[i];
              nonGeneric.items[nonGenericCount] = {
                API_itemId: result.items[i].itemId,
                name: result.items[i].name,
                price: result.items[i].salePrice,
                // brand: result.items[i].brandName,
                upc: result.items[i].upc,
                images: {
                  thumbnail: result.items[i].thumbnailImage,
                  medium: result.items[i].mediumImage,
                  large: result.items[i].largeImage
                },
                // specs : {
                //   size: result.size,
                //   color: result.color
                // },
                stock: result.items[i].stock
              }
              nonGenericCount++
            }
          }
          nonGeneric.nonGenericItems = (nonGenericCount)
          nonGeneric.genericItemsRemoved = (result.numItems - nonGenericCount)
          // res.json(result)
          res.json(nonGeneric)
          res.status(200)
        })
    }
  }) // end of GET brands routes

/**
 * /api/queries/item?itemId=<walmart item id> ** WORKING **
 */
router.route('/queries/item')
  .get(function (req, res) {
    var _itemURI = uri + '/items/' + req.query.itemId + '?'
    var _format = 'format=json'

    console.log('GET on /queries/item')
    if (req.query) {
      // use fetch api to get the data from the walmart api
      // _itemURI + _query + _format + _key
      // http://api.walmartlabs.com/v1/items/<itemId>?format=json&apiKey=<apiKey>
      fetch(_itemURI + _format + _key)
        .then(function (res) {
          return res.json()
        })
        .then(function (result) {
          /**
           * name
           * salePrice
           * upc
           * brandName
           * size
           * color
           *
           */
          console.log(result.name)
          res.json({
            name: result.name,
            upc: result.upc,
            price: result.salePrice,
            brand: result.brandName,
            specs: {
              size: result.size,
              color: result.color
            },
            images: {
              thumbnail: result.thumbnailImage,
              medium: result.mediumImage,
              large: result.largeImage
            },
            stock: result.stock
          })
          res.status(200)
        })
    }
  }) // end of GET queries/item route

/**
 * UPC Searches
 * -- Try Walmart API first,
 * --- but upon empty result, try upcDatabase API
 */
/**
 * /api/queries/upc_search?upc=<any upc>  ** WORKING **
 */
router.route('/queries/upc_search')
  .get(function (req, res) {
    var _itemURI = uri + '/items?'
    var _format = 'format=json'
    var _upc = '&upc=' + req.query.upc

    console.log('GET on /queries/upc_search', req.query.upc)
    if (req.query) {
      fetch(_itemURI + _format + _key + _upc)
        .then(function (res) {
          return res.json()
        })
        .then(function (result) {
          var upcCount = 0
          var upcResult = {
            numItems: 0,
            items: {}
          }
          if (!result.items) {
            console.log('Walmart API failed. Searching UPC Database API')
            fetch(_upcUri + '/product/' + req.query.upc + '/' + _upcKey)
              .then(function (res) {
                return res.json()
              })
              .then(function (result) {
                if (!result.upcnumber) {
                  // NO RESULTS return empty with 200 OK status
                  console.log('No results found on either API')
                  res.json({
                    numItems: 0,
                    items: {}
                  })
                  res.status(200)
                } else {
                  // FOUND ON UPC API
                  upcResult.items[0] = {
                    itemId: result.itemId,
                    name: result.title,
                    price: result.msrp,
                    upc: result.upcnumber,
                    brand: result.brand,
                    specs: {
                      size: result.size,
                      color: result.color
                    },
                    images: {
                      thumbnail: result.thumbnailImage,
                      medium: result.mediumImage,
                      large: result.largeImage
                    },
                    stock: result.stock
                  }
                  upcResult.numItems = 1
                  res.json(upcResult)
                  res.status(200)
                }
              })
              .catch(function (err) {
                console.log(err)
                res.json({message: 'There was a problem locating any UPC data'})
                res.status(204)
              })
          } else {
            // FOUND ON WALMART API
            for (var i = 0; i < result.items.length; i++) {
              var curr = result.items[i]
              upcResult.items[i] = {
                itemId: curr.itemId,
                name: curr.name,
                price: curr.salePrice,
                upc: curr.upc,
                brand: curr.brandName,
                specs: {
                  size: curr.size,
                  color: curr.color
                },
                images: {
                  thumbnail: curr.thumbnailImage,
                  medium: curr.mediumImage,
                  large: curr.largeImage
                },
                stock: curr.stock
              }
              upcCount++
            }
            upcResult.numItems = upcCount
            // res.json(result)
            res.json(upcResult)
            res.status(200)
          }
        })
        .catch(function (err) {
          if (err) {
            console.error(err)
          }
        })
    }
  }) // end of GET queries/item route

/**
 *  /api/queries/search
 */
router.route('/queries/taxonomy')
  .get(function (req, res) {
    var _taxonomyURI = uri + '/taxonomy?'
    var _format = '&format=json'

    console.log('GET on /queries/taxonomy')
    if (req.query.query) {
    // use fetch api to get the data from the walmart api
    // _taxonomyURI + _query + _format + _categoryId
      fetch(_taxonomyURI + _format + _key)
        .then(function (res) {
          return res.json()
        })
        .then(function (result) {
          /**
           * categories (result.categories)
           * - id (result.categories.id)
           * - name (result.categories.name)
           * - children (result.categories.children)
           * --  id (result.categories.children[0].id)
           * --  name (result.categories.children[0].name)
           * --  children (result.categories.children[0].children)
           * --- id  (result.categories.children[0].children[0].id)
           * --- name  (result.categories.children[0].children[0].name)
           *
           */
          console.log(result)
        })
    }
  }) // end of GET brands routes

/**
 * Export the router
 */
module.exports = router
