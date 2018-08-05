/**
 * Add this file to the remote .gitignore on GitHub (don't create a local gitignore, so Heroku isn't affected)
 *
 * Barcode API: https://www.buycott.com/api $50/Month for Basic service
 *
 */

const Keys = {
  mongoDB: 'mongodb://dev:dQTrUnb3dyjGqYLm@ds121999.mlab.com:21999/shopdrop_development',
  walmartAPI: 'efher8g9fphedesqbaggwh59',
  walmartURI: 'http://api.walmartlabs.com/v1',
  upcDatabaseAPI: '689CDDFEC384DFE1B1D38310BF9B1BDE', // http://upcdatabase.org/
  upcDatabaseURI: 'http://api.upcdatabase.org', // password to login "t+p-L&]}dyZ)XT86" with dev.shopdropdelivery@gmail.com
  keyboardCat: '6de3299a4e70d304d9ae47e48ba8ec6d',
  bcryptSaltRounds: 12,
  tokenSecret: 'fk*MHmfGegKmE!48yu&F',
  tipeAPI: '4KKOZOJGCAICAWD4JUJHG5TAQ',
  tipeORG: 'NWI0Njg1ZTE2OGRmNGEwMDEzMDM0OGUy'

}

module.exports = {
  mlab: Keys.mongoDB,
  walmartKey: Keys.walmartAPI,
  walmartURI: Keys.walmartURI,
  upcDBKey: Keys.upcDatabaseAPI,
  upcDBURI: Keys.upcDatabaseURI,
  cat: Keys.keyboardCat,
  saltRounds: Keys.bcryptSaltRounds,
  tokenSecret: Keys.tokenSecret,
  tipeAPI: Keys.tipeAPI,
  tipeORG: Keys.tipeORG
}
