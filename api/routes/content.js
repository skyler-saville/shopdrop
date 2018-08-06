/**
 * Express Stuff
 */
var express = require('express')
var router = express.Router()
var marked = require('marked')

// fetch API npm package
const fetch = require('node-fetch')
let Keys
// Keys
if (process.env.TESTINGFORAPULSE) {
  // set keys with env keys
  Keys = require('../herokeys')
  console.log('herokeys being used')
} else {
  Keys = require('../../../keys')
  console.log('keys being used')
}
const YOUR_ORG_SECRET_KEY = Keys.tipeORG
const YOUR_API_KEY = Keys.tipeAPI
const DOCUMENT_IDS = require('../CMS').Documents
const FOLDER_IDS = require('../CMS').Folders

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
        // console.log(data)
        const title = data.blocks[0].value
        const content = data.blocks[1].value

        res.json({
          title: marked(title),
          content: marked(content)
        })
      }) // end of _home
  })

router.route('/content/mission_statement')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._missionstatement, {
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
        const content = data.blocks[1].value
        const image = data.blocks[2].value

        res.json({
          content: marked(content),
          url: image.url
        })
      })
  })

router.route('/content/home_images')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._homeimages, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': YOUR_API_KEY,
        'Tipe-Id': YOUR_ORG_SECRET_KEY
      }
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        console.log('home_images block[1].value', data.blocks[1].value)
        // five images in each image template
        const image1 = data.blocks[0].value
        const image2 = data.blocks[1].value
        const image3 = data.blocks[2].value
        const image4 = data.blocks[3].value
        const image5 = data.blocks[4].value

        res.json({
          img1: image1.url,
          img2: image2.url,
          img3: image3.url,
          img4: image4.url,
          img5: image5.url
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

router.route('/content/about-folder')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/folder/' + FOLDER_IDS.__About, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': YOUR_API_KEY,
        'Tipe-Id': YOUR_ORG_SECRET_KEY
      }
    })
      .then(function (res) { return res.json() })
      .then(function (folder) {
        console.log(folder)

        res.json(folder)
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

router.route('/content/visitor-footer')
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
        const content = data.blocks[1].value

        res.json({
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

router.route('/content/privacy_policy')
  .get(function (req, res) {
    fetch('https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._privacy_policy, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': YOUR_API_KEY,
        'Tipe-Id': YOUR_ORG_SECRET_KEY
      }
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        console.log('Privacy Policy Reqested')
        console.log(data.blocks[0])
        const doc = data.blocks[0].value

        res.json({
          content: marked(doc)
        })
      })
  })

/**
 * Export the router
 */
module.exports = router
