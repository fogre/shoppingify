const bcrypt = require('bcrypt')
//models
const Category = require('../models/category')
const Item = require('../models/item')
const User = require('../models/user')
//defaultCategoriesAndItems
const { defaultCategoriesAndItems, devUser } = require('./defaultData')

/*Helper to initialize DB with default categories and items*/
const seedDBwithDefaultData = async () => {
  try {
    const existingCategories = await Category.find({})
    if (existingCategories && existingCategories.length) {
      console.log('DB already has categories, skipping initalization')
      return
    }

    for (const cat of Object.keys(defaultCategoriesAndItems)) {
      const newCategory = await new Category({
        name: cat,
        items: []
      }).save()

      for (const item of defaultCategoriesAndItems[cat]) {
        const newItem = await new Item({
          category: newCategory._id,
          ...item
        }).save()

        newCategory.items = newCategory.items.concat(newItem._id)
      }
      await newCategory.save()
    }
  } catch (e) {
    console.log(e)
  }
}

//helper to init DB with default user
const seedDBwithDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ email: devUser.email })
    if (existingUser) {
      console.log('DB already has development user, skipping initalization')
      return
    }

    const passHash = await bcrypt.hash(devUser.password, 10)
    const newUser = await new User({
      email: devUser.email,
      passwordHash: passHash
    }).save()
    return newUser
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  seedDBwithDefaultData,
  seedDBwithDefaultUser
}