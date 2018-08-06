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

const options = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': YOUR_API_KEY,
    'Tipe-Id': YOUR_ORG_SECRET_KEY
  }
}

let urls = [
  'https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._home,
  'https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._missionstatement,
  'https://api.tipe.io/api/v1/document/' + DOCUMENT_IDS._homeimages
]

router.route('/content/home-content')
  .get(function (req, res) {
    Promise.all(urls.map(url =>
      fetch(url, options).then(resp => resp.json())
    )).then(content => {
      var thisContent = {}
      content.forEach(function (part) {
        if (part.name === '_home') {
          var title = part.blocks[0].value
          var snarky = part.blocks[1].value
          thisContent['main'] = {
            title: title,
            content: marked(snarky)
          }
        }
        if (part.name === '_homeImages') {
          thisContent['images'] = {}
          for (var i = 0; i < part.blocks.length; i++) {
            let image = part.blocks[i].value
            // console.log('image.name', image.name)
            // console.log('image.url', image.url)
            thisContent.images['img_' + (i + 1)] = {
              url: image.url,
              alt: image.name
            }
          }
        }
        if (part.name === '_missionstatement') {
          var mission = part.blocks[1].value
          var missionImg = part.blocks[2].value
          thisContent['mission'] = {
            mission: marked(mission),
            missionImg: {
              url: missionImg.url,
              alt: missionImg.name
            }
          }
        }
      })

      res.json(thisContent)
    })
  })

  /**
 * Export the router
 */
module.exports = router
