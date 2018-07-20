// const mongoose = require('mongoose')
// const extendSchema = require('mongoose-extend-schema')
// const Keys = require('../keys')
// const saltRounds = Keys.saltRounds
// const uniqueValidator = require('mongoose-unique-validator')
// const bcrypt = require('bcrypt')
// const Schema = mongoose.Schema

// const statesArray = {
//   values: [
//     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
//     'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
//     'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
//     'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
//     'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
//   ],
//   message: 'Specify the correct state abbreviation'
// }

// const accountTypes = {
//   values: [
//     'guest', 'shopper', 'dropper', 'admin', 'vulcan' // 0=guest, 1=shopper, 2=dropper, 3=admin, 4=vulcan(superAdmin)
//   ]
// }

// /**
//  * User Schema
//  *  name.first
//  *  name.last
//  *  email
//  *  password
//  *  phone
//  *  address.street
//  *  address.apt
//  *  address.city
//  *  address.state
//  *  address.zip
//  *  address.instructions
//  */
// const userSchema = new Schema({
//   name: { // name validation
//     first: {
//       type: String,
//       required: [true, 'First name is required'],
//       minlength: [1, 'Name can not be less than 1 letter'],
//       maxlength: [20, 'Name can not be that long. Please shorten it.']
//     },
//     last: {
//       type: String,
//       required: [true, 'Last name is required'],
//       minlength: [1, 'Name can not be less than 1 letter'],
//       maxlength: [20, 'Name can not be that long. Please shorten it.']
//     }
//   },
//   email: { // email uniqueness validation
//     type: String,
//     required: [true, 'Email is required'],
//     unique: [true, 'The username or password is incorrect']
//   },
//   password: { // password validation
//     type: String,
//     required: [true, 'Password is required']
//   },
//   phone: { // phone number validation
//     type: String,
//     required: [true, 'Phone number is required'],
//     minlength: [10, 'Phone number must be at least 10 digits long'],
//     maxlength: [15, 'Phone number must no more than 15 digits long']
//   }
// })

// /**
//  * Base User Email validate
//  */
// userSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})

// /**
//  * Base User Prehooks
//  */
// // hashing a Base User password before saving it to the database
// userSchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, saltRounds, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

// /**
//  * Base User Methods
//  */
// userSchema.methods.validatePassword = function (plainTextPassword, callback) {
//   console.log('comparing passwords')
//   bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
//     callback(valid) // whatever else is needed to be done can be done using a callback
//   })
// }

// /**
//  * Vulcan Schema
//  */
// const VulcanSchema = extendSchema(userSchema, {
//   // Account Type... default to 'Vulcan' (a.k.a. SuperUser)
//   account_type: { // state validation
//     type: String,
//     enum: accountTypes.values,
//     default: accountTypes.values[4] // 'Vulcan' is the default
//   }
//   // invite_code: {
//   //   vulcan: {
//   //     type: String
//   //   },
//   //   admin: {
//   //     type: String
//   //   },
//   //   delivery: {
//   //     type: String,
//   //     default: 'IWannaDropShop!'
//   //   }
//   // }
// })
// // ----------
// VulcanSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})
// /**
//  * Vulcan User Prehooks
//  */
// // hashing a Base User password before saving it to the database
// VulcanSchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, saltRounds, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

// /**
//  * Vulcan User Methods
//  */
// VulcanSchema.methods.validatePassword = function (plainTextPassword, callback) {
//   console.log('comparing passwords')
//   bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
//     callback(valid) // whatever else is needed to be done can be done using a callback
//   })
// }
// // ----------
// /**
//  * Admin Schema
//  */
// const AdminSchema = extendSchema(userSchema, {
//   // Account Type... default to 'Admin'
//   account_type: { // state validation
//     type: String,
//     enum: accountTypes.values,
//     default: accountTypes.values[3] // 'Admin' is the default
//   }
//   // invite_code: {
//   //   admin: {
//   //     type: String
//   //   },
//   //   delivery: {
//   //     type: String,
//   //     default: 'IWannaDropShop!'
//   //   }
//   // }
// })
// // ---------
// AdminSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})
// /**
//  * Admin User Prehooks
//  */
// // hashing a Base User password before saving it to the database
// AdminSchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, saltRounds, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

// /**
//  * Admin User Methods
//  */
// AdminSchema.methods.validatePassword = function (plainTextPassword, callback) {
//   console.log('comparing passwords')
//   bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
//     callback(valid) // whatever else is needed to be done can be done using a callback
//   })
// }
// // ---------

// /**
//  * Delivery Schema (dropper)
//  */
// const DeliverySchema = extendSchema(userSchema, {
//   // Account Type... default to 'Dropper'
//   account_type: { // state validation
//     type: String,
//     enum: accountTypes.values,
//     default: accountTypes.values[2] // 'Dropper' is the default
//   },
//   orders: {
//     current: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = active
//     previous: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = filled
//     cancelled: [{type: Schema.Types.ObjectId, ref: 'Order'}] // array of Order _id's owned by this user with status = cancelled
//   }
//   // invite_code: {
//   //   delivery: {
//   //     type: String,
//   //     default: 'IWannaDropShop!'
//   //   }
//   // }
//   // drivers_license: {
//   //   number: {
//   //     type: String,
//   //     required: [true, 'Please enter your drivers license number']
//   //   },
//   //   state: {
//   //     type: String,
//   //     uppercase: true,
//   //     required: [true, 'State is required for delivery'],
//   //     enum: statesArray.values,
//   //     trim: true
//   //   }
//   // }
// })
// // ----------
// DeliverySchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})
// /**
//  * Delivery User Prehooks
//  */
// // hashing a Base User password before saving it to the database
// DeliverySchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, saltRounds, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

// /**
//  * Delivery User Methods
//  */
// DeliverySchema.methods.validatePassword = function (plainTextPassword, callback) {
//   console.log('comparing passwords')
//   bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
//     callback(valid) // whatever else is needed to be done can be done using a callback
//   })
// }
// // ----------

// /**
//  * Shopper Schema
//  */
// const ShopperSchema = extendSchema(userSchema, {
//   // Account Type... default to 'Shopper'
//   account_type: { // state validation
//     type: String,
//     enum: accountTypes.values,
//     default: accountTypes.values[1] // 'Shopper' is the default
//   },
//   address: {
//     street: { // street address validation
//       type: String,
//       required: [true, 'Street address is required for delivery']
//     },
//     apt: {
//       type: String
//     },
//     city: { // city validation
//       type: String,
//       required: [true, 'City is required for delivery']
//     },
//     state: { // state validation
//       type: String,
//       uppercase: true,
//       required: [true, 'State is required for delivery'],
//       enum: statesArray.values,
//       trim: true
//     },
//     zip: { // zip code validation
//       type: String,
//       required: [true, 'The zip code is required'],
//       minlength: [5, 'Please supply a 5 digit zip code'],
//       maxlength: [5, 'The zip code you provided was too long']
//     },
//     instructions: { // special delivery instructions
//       type: String
//     }
//   },
//   orders: {
//     current: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = active
//     previous: [{type: Schema.Types.ObjectId, ref: 'Order'}], // array of Order _id's owned by this user with status = filled
//     cancelled: [{type: Schema.Types.ObjectId, ref: 'Order'}] // array of Order _id's owned by this user with status = cancelled
//   }
// })
// // -------------
// ShopperSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})
// /**
//  * Shopper User Prehooks
//  */
// // hashing a Base User password before saving it to the database
// ShopperSchema.pre('save', function (next) {
//   var user = this
//   bcrypt.hash(user.password, saltRounds, function (err, hash) {
//     if (err) {
//       return next(err)
//     }
//     user.password = hash
//     next()
//   })
// })

// /**
//  * Shopper User Methods
//  */
// ShopperSchema.methods.validatePassword = function (plainTextPassword, callback) {
//   console.log('comparing passwords')
//   bcrypt.compare(plainTextPassword, this.password).then(function (valid) {
//     callback(valid) // whatever else is needed to be done can be done using a callback
//   })
// }
// // -------------

// const GuestSchema = new Schema({
//   // Account Type... default to 'Guest' (no login option and is removed from database 24 hours after delivery)
//   account_type: { // state validation
//     type: String,
//     enum: accountTypes.values,
//     default: accountTypes.values[0] // 'Guest' is the default
//   },
//   name: { // name validation
//     first: {
//       type: String,
//       required: [true, 'First name is required'],
//       minlength: [1, 'Name can not be less than 1 letter'],
//       maxlength: [20, 'Name can not be that long. Please shorten it.']
//     },
//     last: {
//       type: String,
//       required: [true, 'Last name is required'],
//       minlength: [1, 'Name can not be less than 1 letter'],
//       maxlength: [20, 'Name can not be that long. Please shorten it.']
//     }
//   },
//   email: { // email uniqueness validation
//     type: String,
//     required: [true, 'Email is required'],
//     unique: [true, 'The username or password is incorrect']
//   },
//   phone: { // phone number validation
//     type: String,
//     required: [true, 'Phone number is required'],
//     minlength: [10, 'Phone number must be at least 10 digits long'],
//     maxlength: [15, 'Phone number must no more than 15 digits long']
//   },
//   address: {
//     street: { // street address validation
//       type: String,
//       required: [true, 'Street address is required for delivery']
//     },
//     apt: {
//       type: String
//     },
//     city: { // city validation
//       type: String,
//       required: [true, 'City is required for delivery']
//     },
//     state: { // state validation
//       type: String,
//       uppercase: true,
//       required: [true, 'State is required for delivery'],
//       enum: statesArray.values,
//       trim: true
//     },
//     zip: { // zip code validation
//       type: String,
//       required: [true, 'The zip code is required'],
//       minlength: [5, 'Please supply a 5 digit zip code'],
//       maxlength: [5, 'The zip code you provided was too long']
//     },
//     instructions: { // special delivery instructions
//       type: String
//     }
//   },
//   // guest can only have one active order
//   current_order: {type: Schema.Types.ObjectId, ref: 'Order'} // Order _id owned by this user (check status of this order for all stages)
// })
// GuestSchema.plugin(uniqueValidator, {message: 'Error, {PATH} already exists. Please try again.'})

// /**
//  * Models
//  */

// /**
//  * User Roles:
//  * User -- Base for all of the following...
//  * Vulcan -- Super Admin ... has ability to see all data
//  * Admin -- Access to ALL CRUD RESTful actions
//  * Dropper -- This is the person doing the shopping and delivery for client
//  * Shopper -- This is the client who is paying for the service and receiving the delivery
//  * Guest -- A single use Cash on Delivery user (cannot save orders and has no schema)
//  *
//  */
// const User = mongoose.model('User', userSchema, 'users') // base user model
// User.Vulcan = mongoose.model('Vulcan', VulcanSchema, 'users') // super admin model
// User.Admin = mongoose.model('Admin', AdminSchema, 'users') // basic admin
// User.Shopper = mongoose.model('Shopper', ShopperSchema, 'users') // customer model
// User.Dropper = mongoose.model('Dropper', DeliverySchema, 'users') // delivery driver model
// User.Guest = mongoose.model('Guest', GuestSchema, 'users') // Temp guest model ... gives ability to add email to list of contacts

// /**
//  * Exports
//  */
// module.exports = {
//   User: User, // Base User model used for authentication
//   Vulcan: User.Vulcan,
//   Admin: User.Admin,
//   Shopper: User.Shopper,
//   Dropper: User.Dropper,
//   Guest: User.Guest
// }
