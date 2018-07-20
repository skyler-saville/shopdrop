var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema

/**
 * Order Count Schema
 */
var orderCountSchema = new Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
})
var counter = mongoose.model('counter', orderCountSchema)

/**
 * Order Status Options Values
 */
var statusOptions = [
  'New', // default when first item is added
  'Created', // assigned when shopper confirms order is ready
  'Assigned', // when a dropper is associate with the order
  'Shopped', // when the dropper has paid for the order
  'Dropped', // when the dropper has succesfully delivered the order
  'Unresolved Issue', // there is an issue that the dropper is in the process of resolving
  'Payment Problem' // the shoppers payment method did not go through correctly and my need to be contacted
]

/**
 * Order Schema
 *  ordered by
 *  dropped by
 *  active
 *  status
 *  known_items (array of ObjectIds)
 *  unknown_items (array of objects)
 *    name
 *    size
 *    variation
 *    active
 *    upc
 *    brand_name
 *  order qty
 *  date created
 *
 */
var orderSchema = new Schema({

  ordered_by: {type: Schema.Types.ObjectId, ref: 'User'}, // User's _id associated with this order
  dropper_assigned: {type: Schema.Types.ObjectId, ref: 'User'}, // Dropper's User _id
  nickname: { // nickname
    type: String,
    maxlength: [24, 'Nickname can not be that long. Please shorten it.']
  },
  active: { // is this order active?
    type: Boolean,
    default: true
  },
  status: { // what is the current status of this order (so the shopper and admins can see)
    type: String,
    enum: statusOptions,
    default: statusOptions[0]
  },
  known_items: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  unknown_items: [
    {
      product: { // user entered product can be easily added to database
        name: { // name validation
          type: String,
          required: [true, 'Product entered must have a name'],
          minlength: [1, 'NAme can not be less than 1 letter'],
          maxlength: [30, 'Name can not be that long. Please shorten']
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
          default: false
        },
        upc: {
          type: String,
          unique: [true, 'That UPC code already exists in the database']
        },
        brand_name: { // Is this product Generic? Only associated with a specific brand?
          type: String,
          default: 'Generic Brand'
        }
      }
    }
  ],
  order_qty: {
    type: Number
  },
  date_created: {
    type: Date,
    default: Date.now()
  },
  order_number: {
    type: Number
  }
})

/**
 * Unique validate
 */
orderSchema.plugin(uniqueValidator, { message: 'Error, {PATH} already exists. Please try again.' })

/**
 * Increment the order_number
 */
orderSchema.pre('save', function (next) {
  var doc = this
  // find by _id async
  if (this.isNew) {
    counter.findByIdAndUpdateAsync({ _id: 'orderId' }, { $inc: { seq: 1 } }, {new: true, upsert: true}).then(function (count) {
      console.log('New Order created. Updated count:', JSON.stringify(count))
      doc.order_number = count.seq
      next()
    })
      .catch(function (error) {
        console.error('counter error-> : ' + error)
        throw error
      })
  } else {
    console.log('Save on Order that already existed. order_number value is unchanged')
  }
})

/**
 * Models
 */
var Order = mongoose.model('Order', orderSchema)

/**
 * Exports
 */
module.exports = {
  Order: Order
}
