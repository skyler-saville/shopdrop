/**
 * Add this file to the remote .gitignore on GitHub (don't create a local gitignore, so Heroku isn't affected)
 *
 * Barcode API: https://www.buycott.com/api $50/Month for Basic service
 *
 */

const Keys = {
  mongoDB: process.env.MONGODB,
  walmartAPI: process.env.WALMARTAPI,
  walmartURI: process.env.WALMARTURI,
  upcDatabaseAPI: process.env.UPCAPI, // http://upcdatabase.org/
  upcDatabaseURI: process.env.UPCURI, // "t+p-L&]}dyZ)XT86"
  keyboardCat: process.env.KEYBOARDCAT,
  bcryptSaltRounds: process.env.SALTROUNDS,
  tokenSecret: process.env.TOKENSECRET,
  tipeAPI: process.env.TIPEAPI,
  tipeORG: process.env.TIPEORG

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
