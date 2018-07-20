/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()
var marked = require('marked')

// fetch API npm package
const fetch = require('node-fetch')

const YOUR_ORG_SECRET_KEY = require('../keys').tipeORG
const YOUR_API_KEY = require('../keys').tipeAPI
const DOCUMENT_IDS = require('../CMS').Documents

router.route('/content/home')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._home, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': YOUR_API_KEY,
        'Tipe-Id': YOUR_ORG_SECRET_KEY
      }
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        console.log(data)
        const title = data.blocks[0].value
        const content = data.blocks[1].value
        res.json({
          title: marked(title),
          content: marked(content)
        })
      })
  })

/**
 * Export the router
 */
module.exports = router
