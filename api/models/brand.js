var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema

/**
 * Brand Schema
 *  name
 *  api URI
 *  website URL
 *  active
 *  products
 */
var brandSchema = new Schema({
  name: { // name validation
    type: String,
    required: [true, 'Brand name is required'],
    minlength: [1, 'Name can not be less than 1 letter'],
    maxlength: [30, 'Name can not be that long. Please shorten it.'],
    unique: [true, 'This brand already exists in the database.'],
    uniqueCaseInsensitive: true
  },
  api: { // brand api URI
    type: String
  },
  website: { // email uniqueness validation
    type: String
  },
  active: { // is this brand active?
    type: Boolean,
    default: true
  },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}] // array of products _id's associated with this brand
})

/**
 * Unique validate
 */
brandSchema.plugin(uniqueValidator, { message: 'Error, {PATH} already exists. Please try again.' })

/**
 * Models
 */
var Brand = mongoose.model('Brand', brandSchema)

/**
 * Exports
 */
module.exports = {
  Brand: Brand
}
