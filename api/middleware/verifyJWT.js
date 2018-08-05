// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
var approvedRoutes = [
  { method: 'POST', route: '/users/shoppers', approved: true }, // OPEN registration for shoppers (default usertype)
  { method: 'POST', route: '/users/droppers', approved: false }, // CLOSED registration for delivery -- invite only
  { method: 'POST', route: '/users/admins', approved: false }, // CLOSED registration for admins -- invite only
  { method: 'POST', route: '/users/vulcans', approved: false } // CLOSED registration for super-admins (vulcans) -- invite only
]

function approvedUserCreates (req) {
  var counter = 0
  for (var i = 0; i < approvedRoutes.length; i++) {
    if (req.method === approvedRoutes[i].method && req.path === approvedRoutes[i].route) {
      if (approvedRoutes[i].approved) {
        // route matched and approved
        counter++
      }
    }
  }
  // check if counter is greater than 0
  return (counter > 0)
}

function verifyToken (req, res, next) {
  // check path against /login path
  if (req.path === '/login' || approvedUserCreates(req)) {
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
        file: 'verifyJWT.js',
        fullReportders: req.method
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
