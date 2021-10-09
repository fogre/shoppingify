const mongoose = require('mongoose')

const ShoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['saved', 'completed', 'cancelled'],
    default: ['saved']
  },
  list: [{
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    items: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
      },
      pcs: Number,
      completed: Boolean
    }]
  }],
  itemCount: Number
})

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema)

module.exports = ShoppingList