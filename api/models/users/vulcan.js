/**
 * This will be the base user schema that will be used with the user discriminators.
 * This will also implement a global plugin for Passport-Local-Mongoose,
 * which helps with user authentications
 */

// const Keys = require('../../keys')
// const saltRounds = Keys.saltRounds
// const bcrypt = require('bcrypt')
// const extendSchema = require('mongoose-extend-schema')
// const uniqueValidator = require('mongoose-unique-validator')

const Base = require('./baseUser').Base
const Options = require('./baseUser').Options
const mongoose = require('mongoose')
// const Schema = mongoose.Schema

const accountTypes = {
  values: [
    'guest', 'shopper', 'dropper', 'admin', 'vulcan' // 0=guest, 1=shopper, 2=dropper, 3=admin, 4=vulcan(superAdmin)
  ]
}

const thisSchema = new mongoose.Schema({
  // Account Type... default to 'Vulcan' (a.k.a. Superior SuperUser)
  account_type: { // state validation
    type: String,
    enum: accountTypes.values,
    default: accountTypes.values[4] // 'Vulcan' is the default
  },
  _isActive: {
    type: Boolean,
    default: false // Pending Approval via Email confirmation
  }
}, Options)

const vulcanDisc = Base.discriminator('Vulcan', thisSchema)

module.exports = {
  Vulcan: vulcanDisc
}
