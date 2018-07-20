const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../keys').tokenSecret
const nonAuthPaths = require('./authPaths')

function vulcanAuth (req, res, next) {
  // if (req.path === '/login') etc
  if (nonAuthPaths(req, res)) {
    next()
  } else {
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(401).json({
          error: 'It appears that your Authorization Token is no longer valid. Please log back in.',
          reason: 'Unknown Auth Error',
          offendingPath: req.path
        })
      } else if (authData.iat >= authData.exp) {
        res.status(401).json({
          error: 'It appears that your Authorization Token is no longer valid. Please log back in.',
          reason: 'Token Expiration',
          offendingPath: req.path
        })
      } else {
        // setting up a value to use in other routes
        req.authData = authData
        console.log('authData saved on req.authData')
        // fire next middleware
        next()
      }
    })
  }
}

module.exports = {
  vulcan: vulcanAuth
}
