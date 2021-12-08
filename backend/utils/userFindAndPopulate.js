const User = require('../models/user')

const findAndPopulateUser = async user => {
  try {
    return await User.findById(user._id)
      .populate({
        path: 'openList',
        populate: 'list.category list.items.item'
      })
      .populate({
        path: 'history',
        populate: 'list.category list.items.item',
      })
      .populate({
        path: 'statistics',
        populate: 'topItems.item topCategories.category'
      })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  findAndPopulateUser
}