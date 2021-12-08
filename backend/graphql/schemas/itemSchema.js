const { gql } = require('apollo-server-express')
//models
const Category = require('../../models/category')
const Item = require('../../models/item')
//utils
const {
  authenticateUser,
  throwUserInputError
} = require('../../utils/errorsAndValidations')

const typeDefs = gql`
  "Item object"
  type Item {
    id: ID!
    name: String!
    category: Category!
    note: String
    image: String
  }

  "Input for new Item"
  input ItemInput {
    id: ID
    name: String!
    category: CategoryInput!
    note: String
    image: String
  }

  extend type Query {
    "Get items as an array. Optional search parameter: name."
    items(name: String): [Item!]!

    "Get a single item. Search parameters: id, name."
    itemFindOne(id: ID, name: String): Item
  }

  extend type Mutation {
    "Add new item and create a new category if it doesent exist"
    itemAddOne(input: ItemInput): Item
  }
`

const itemResolvers = {
  Query: {
    items: async (root, args) => {
      try {
        return await Item.find(args).populate('category')
      } catch (e) {
        throwUserInputError(e, args)
      }
    },

    itemFindOne: async (root, args) => {
      try {
        if (args.id) {
          return await Item.findById(args.id).populate('category')
        }
        console.log(args)
        return await Item.findOne(args).populate('category')
      } catch (e) {
        throwUserInputError(e, args)
      }
    }
  },

  Mutation: {
    itemAddOne: async (root, { input }, context) => {
      authenticateUser(context)
      try {
        let category = await Category.findOne(input.category)
        if (!category) {
          category = await new Category({
            name: input.category.name
          }).save()
        }

        const newItem = await new Item({
          name: input.name,
          note: input.note,
          image: input.image,
          category: category._id
        }).save()

        category.items = category.items.concat(newItem._id)
        await category.save()

        return await newItem.populate('category')
      } catch (e) {
        throwUserInputError(e, input)
      }
    }
  }
}

module.exports = {
  typeDefs,
  itemResolvers
}