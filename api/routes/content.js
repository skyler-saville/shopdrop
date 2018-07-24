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

/**
 * Home Content Route
 */

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

router.route('/content/about')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._about, {
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

router.route('/content/contact')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._contact, {
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

router.route('/content/signup')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._signup, {
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

router.route('/content/login')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._login, {
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
        let title
        let content
        if (data.blocks[0].value) {
          title = marked(data.blocks[0].value)
        } else {
          title = 'Login'
        }
        if (data.blocks[1].value) {
          content = marked(data.blocks[1].value)
        } else {
          content = 'Content Coming Soon'
        }

        res.json({
          title: title,
          content: content
        })
      })
  })

router.route('/content/footer1')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._footer1, {
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

router.route('/content/header_visitors')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._header_visitors, {
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
        const links = []
        for (var i = 1; i < data.blocks.length; i++) {
          var link = data.blocks[i].value
          links.push({link})
        }
        console.log(links)

        res.json({
          title: marked(title),
          header_links: links
        })
      })
  })

router.route('/content/image_test')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._image_test, {
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
        const image = data.blocks[0].value
        console.log('image.name', image.name)
        console.log('image.source', image.source)
        console.log('image.url', image.url)
        console.log('image.id', image.id)

        res.json({
          url: image.url
        })
      })
  })

/**
 * Export the router
 */
module.exports = router
