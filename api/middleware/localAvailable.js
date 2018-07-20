// test localstorage
function localAvailable () {
  var test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  localAvailable: localAvailable
}
