const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  note: String,
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

itemSchema.plugin(
  uniqueValidator,
  { message: 'An item with name {VALUE} already exists' }
)

const Item = mongoose.model('Item', itemSchema)

module.exports = Item