var express = require('express')
var router = express.Router()
var marked = require('marked')

// fetch API npm package
const fetch = require('node-fetch')

const YOUR_ORG_SECRET_KEY = require('../keys').tipeORG
const YOUR_API_KEY = require('../keys').tipeAPI
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

// let process = (content) => {
//   var thisContent = {}
//   // handle promise when resolved
//   // console.log('THIS is the content from the Promise', content)
//   if (content.name === '_home') {
//     var title = content.blocks[0].value
//     var snarky = content.blocks[1].value
//     thisContent = {
//       part: 'main',
//       title: title,
//       content: marked(snarky)
//     }
//   } else if (content.name === '_missionstatement') {
//     var mission = content.blocks[1].value
//     var missionImg = content.blocks[2].value
//     thisContent = {
//       part: 'mission',
//       mission: marked(mission),
//       missionImg: missionImg
//     }
//   } else if (content.name === '_homeImages') {
//     thisContent['part'] = 'images'
//     for (var i = 0; i < content.blocks.length; i++) {
//       let image = content.blocks[i].value
//       // console.log('image.name', image.name)
//       // console.log('image.url', image.url)
//       thisContent['img' + i] = {
//         url: image.url,
//         alt: image.name
//       }
//     }
//   }
//   if (thisContent) {
//     return thisContent
//   } else {
//     console.log('there was no content')
//   }
// }

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
