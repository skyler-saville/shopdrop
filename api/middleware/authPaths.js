const OK_PATHS = [ '/', '/login', '/signup' ]

function nonAuthPaths (req, res) {
  for (var i = 0; i < OK_PATHS.length; i++) {
    if (req.path === OK_PATHS[i]) {
      console.log('path ===', req.path)
      return true
    }
  }
  console.log('path ===', req.path)
  return false
}

module.exports = nonAuthPaths
