var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)
var Currency = mongoose.Types.Currency

/**
 * Product Schema
 *  name
 *  api URI
 *  website URL
 *  active
 *  products
 */
var productSchema = new Schema({
  name: { // name validation
    type: String,
    required: [true, 'Product name is required'],
    minlength: [1, 'Name can not be less than 1 letter'],
    maxlength: [30, 'Name can not be that long. Please shorten it.']
  },
  size: { // quantity or weight
    type: String,
    required: [true, 'Please enter a quantity or product weight']
  },
  variation: { // A way to describe the product compared to other similar products (e.g. Chocolate vs Vanilla)
    type: String
  },
  active: { // is this product active?
    type: Boolean,
    default: true
  },
  estimated_price: {
    type: Currency // salePrice from Query to API
  },
  img_url: {
    type: String
    /**
     * loop through imageEntities.length
     * for ()
     */
  },
  upc: {
    type: String,
    unique: [true, 'That UPC code already exists in the database']
  },
  associated_with: { // Is this product Generic? Only associated with a specific brand?
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  }
})

/**
 * Unique validate
 */
productSchema.plugin(uniqueValidator, { message: 'Error, {PATH} already exists. Please try again.' })

/**
 * Models
 */
var Product = mongoose.model('Product', productSchema)

/**
 * Exports
 */
module.exports = {
  Product: Product
}
