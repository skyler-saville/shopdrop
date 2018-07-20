// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function verifyToken (req, res, next) {
  // check path against /login path
  if (req.path === '/login') {
    next()
  } else if (req.headers['Authorization']) {
    console.log('trying for headers')
    const bearerHeader = req.headers['Authorization']
    if (typeof bearerHeader !== 'undefined') {
      // Get token from header (split at space)
      const bearer = bearerHeader.split(' ')
      // Get token from array
      const bearerToken = bearer[1]
      // Set token
      req.token = bearerToken
      console.log('req.token = ', req.token)
      // Next middleware
      next()
    } else {
      // Forbidden
      // res.status(403).json({error: 'You are not authorized to be here. Blah Blah Blah'})
      res.status(401).json({
        error: 'You are not authorized to be here. Please Login or Create an Account.',
        reason: 'Bearer Token: Undefined',
        offendingPath: req.path,
        file: 'verifyJWT.js'
      })
    }
  } else if (req.cookies) {
    console.log('trying for cookies')
    if (req.cookies['Authorization']) {
      req.token = (req.cookies['Authorization'])
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here. Please Login or Create an Account.',
        reason: 'No Authorization Cookie',
        offendingPath: req.path,
        file: 'verifyJWT.js'
      })
    }
  } else {
    res.status(401).json({
      error: 'You are not authorized to be here. Please Login or Create an Account.',
      reason: 'Authorization Catch-all Error',
      offendingPath: req.path,
      file: 'verifyJWT.js'
    })
  }
}

module.exports = {
  verifyJWT: verifyToken
}
