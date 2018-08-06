/**
 * This will be the base user schema that will be used with the user discriminators.
 * This will also implement a global plugin for Passport-Local-Mongoose,
 * which helps with user authentications
 */

let Keys
// Keys
if (process.env.TESTINGFORAPULSE) {
  // set keys with env keys
  Keys = require('../../herokeys')
  console.log('herokeys being used')
} else {
  Keys = require('../../../../keys')
  console.log('keys being used')
}
const saltRounds = Keys.saltRounds
const bcrypt = require('bcrypt')
// const extendSchema = require('mongoose-extend-schema')

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const passportLocalMongoose = require('passport-local-mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// const userOptions = {
//   usernameField: 'email',
//   passwordField: 'password'
// }

const discOptions = {
  discriminatorKey: '_userType',
  collection: 'users'
}

/**
 * User Schema
 *  name.first
 *  name.last
 *  email -- added by passport-local-mongoose
 *  password -- added by passport-local-mongoose
 *  phone
 */
const baseSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'The username or password is incorrect']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  name: { // name validation
    first: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [1, 'Name can not be less than 1 letter'],
      maxlength: [20, 'Name can not be that long. Please shorten it.']
    },
    last: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [1, 'Name can not be less than 1 letter'],
      maxlength: [20, 'Name can not be that long. Please shorten it.']
    }
  },
  phone: { // phone number validation
    type: String,
    required: [true, 'Phone number is required'],
    minlength: [10, 'Phone number must be at least 10 digits long'],
    maxlength: [15, 'Phone number must no more than 15 digits long']
  }
}, discOptions)

/**
 * Prehooks
 */
// hash password before saving it to the database
baseSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

/**
* User Methods
*/
baseSchema.methods.validatePassword = function (plainTextPassword, callback) {
  bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
    callback(valid) // whatever else is needed to be done can be done using a callback
  })
}

mongoose.set('applyPluginsToDiscriminators', true)
baseSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})
// baseSchema.plugin(passportLocalMongoose, userOptions)

const User = mongoose.model('Base', baseSchema) // base user model

module.exports = {
  Base: User,
  Options: discOptions
}
