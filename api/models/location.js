var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema

var statesArray = {
  values: [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ],
  message: 'Specify the correct state abbreviation'
}

/**
 * Location Schema
 *  name
 *  phone
 *  address.street
 *  address.apt
 *  address.city
 *  address.state
 *  address.zip
 *  instructions
 */
var locationSchema = new Schema({
  name: { // name validation
    type: String,
    required: [true, 'Location name is required'],
    minlength: [1, 'Name can not be less than 1 letter'],
    maxlength: [30, 'Name can not be that long. Please shorten it.']
  },
  website: { // website not unique (multiple locations share the same site)
    type: String
  },
  phone: { // phone number validation
    type: String,
    minlength: [10, 'Phone number must be 10 digits long'],
    maxlength: [15, 'Phone number must be 10 digits long'],
    unique: [true, 'That phone number already exists in the database']
  },
  address: {
    street: { // street address validation
      type: String,
      required: [true, 'Street address is required for shopper']
    },
    apt: {
      type: String
    },
    city: { // city validation
      type: String,
      required: [true, 'City is required for shopper']
    },
    state: { // state validation
      type: String,
      uppercase: true,
      required: [true, 'State is required for shopper'],
      enum: statesArray,
      trim: true
    },
    zip: { // zip code validation
      type: String,
      required: [true, 'The zip code is required'],
      minlength: [5, 'Please supply a 5 digit zip code'],
      maxlength: [5, 'The zip code you provided was too long']
    }
  },
  instructions: { // special shopping instructions
    type: String
  },
  associated_brands: [{type: Schema.Types.ObjectId, ref: 'Brand'}] // array of brand _id's assiciated with this location
})

/**
 * Email validate
 */
locationSchema.plugin(uniqueValidator, { message: 'Error, {PATH} already exists. Please try again.' })

/**
 * Models
 */
var Location = mongoose.model('Location', locationSchema)

/**
 * Exports
 */
module.exports = {
  Location: Location
}
