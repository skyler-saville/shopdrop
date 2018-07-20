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

const Base = require('./baseUser').Base // we have to make sure our Dropper schema is aware of the Base User schema
const Options = require('./baseUser').Options
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountTypes = {
  values: [
    'guest', 'shopper', 'dropper', 'admin', 'vulcan' // 0=guest, 1=shopper, 2=dropper, 3=admin, 4=vulcan(superAdmin)
  ]
}

const statesArray = {
  values: [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ],
  message: 'Specify the correct state abbreviation'
}

const thisSchema = new mongoose.Schema({
  // Account Type... default to 'Dropper' (a.k.a. Superior SuperUser)
  account_type: { // state validation
    type: String,
    enum: accountTypes.values,
    default: accountTypes.values[2] // 'Dropper' is the default
  },
  orders: {
    current: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = active
    previous: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = filled
    cancelled: [{type: Schema.Types.ObjectId, ref: 'Order'}] // array of Order _id's owned by this user with status = cancelled
  },
  drivers_license: {
    number: {
      type: String
    },
    state: {
      type: String,
      uppercase: true,
      enum: statesArray.values,
      trim: true
    }
  },
  _isActive: {
    type: Boolean,
    default: false // Pending Approval via Email confirmation
  }
}, Options)

const dropperDisc = Base.discriminator('Dropper', thisSchema)

module.exports = {
  Dropper: dropperDisc
}
