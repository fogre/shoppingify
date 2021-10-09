const { model , Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

/*eslint-disable */
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
/*eslint-enable */

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [emailRegex, 'Please enter valid email address']
  },
  passwordHash: String,
  openList: { type: Schema.Types.ObjectId, ref: 'ShoppingList' },
  history: [{ type: Schema.Types.ObjectId, ref: 'ShoppingList' }],
  statistics: {
    topItems: [{
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      percentage: Number,
      count: Number
    }],
    topCategories: [{
      category: { type: Schema.Types.ObjectId, ref: 'Category' },
      percentage: Number,
      count: Number
    }],
    allItemsCount: {
      type: Number,
      default: 0
    },
    allCategoriesCount: {
      type: Number,
      default: 0
    },
    monthlySummaries: [{
      month: Date,
      itemCount: Number
    }]
  }
})

userSchema.plugin(
  uniqueValidator,
  { message: 'An account for {VALUE} already exists' }
)

const User = model('User', userSchema)

module.exports = User