const { gql, UserInputError } = require('apollo-server-express')
const { DateResolver } = require('graphql-scalars')
//models
const ShoppingList = require('../../models/shoppingList')
//utils
const {
  authenticateUser,
  throwUserInputError,
  validateDate
} = require('../../utils/errorsAndValidations')
const calculateStatistics = require('../../utils/calcStatistics')
const { findAndPopulateUser } = require('../../utils/userFindAndPopulate')

const typeDefs = gql`
  scalar Date

  "Status enum for ShoppingList (saved, completed, cancelled)"
  enum StatusEnum {
    CANCELLED
    COMPLETED
    SAVED
  }
  
  "Item and item specific fields for the ShoppingList' list field"
  type ListItem {
    item: Item!
    pcs: Int!
    completed: Boolean!
  }

  "Input for ListItem in ShoppingList"
  input ListItemInput {
    "ID as Item ID"
    item: ID!
    pcs: Int!
    completed: Boolean!
  }

  "List of Category and ListItems that belong to that Category, for ShoppingList"
  type List {
    category: Category!
    items: [ListItem]
  }

  "Input for List in ShoppingList"
  input ListInput {
    category: ID!
    items: [ListItemInput]!
  }

  "Shopping list for User openList and history"
  type ShoppingList {
    id: ID!
    name: String!
    date: Date!
    status: StatusEnum!
    list: [List]
    itemCount: Int
  }

  "Input for saving ShoppingList"
  input ShoppingListSaveInput {
    id: ID
    name: String!
    date: Date!
    list: [ListInput]!
    itemCount: Int
    status: StatusEnum
  }

  "Input for completing or cancelling ShoppingList"
  input ShoppingListFinishInput {
    date: Date!
    list: [ListInput]!
    status: StatusEnum!
  }

  extend type Query {
    "Returns User's openList or null"
    shoppingList: ShoppingList
  }

  extend type Mutation {
    "Saves User's openList. If User doesen't have an openList, creates it."
    shoppingListSave(input: ShoppingListSaveInput): StatusEnum

    """Complete or cancel ShoppingList with updated List,
       add it to User' history, calculate statistics and set User openList to null"""
    shoppingListFinish(input: ShoppingListFinishInput): User
  }
`

const shoppingListResolvers = {
  Date: DateResolver,

  StatusEnum: {
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    SAVED: 'saved',
  },

  Query: {
    shoppingList: async (root, args, context) => {
      const user = authenticateUser(context)
      try {
        return await ShoppingList
          .findById(user.openList)
          .populate({
            path: 'list',
            populate: 'category items.item'
          })
      } catch (e) {
        throw new UserInputError(e, args)
      }
    }
  },

  Mutation: {
    shoppingListSave: async (root, { input }, context) => {
      const user = authenticateUser(context)
      try {
        let shoppingList = null

        if (user.openList) {
          shoppingList = await ShoppingList.findById(user.openList)
        } else {
          shoppingList = new ShoppingList({
            user: user._id,
            name: input.name
          })
        }

        shoppingList.name = input.name
        shoppingList.list = input.list
        shoppingList.itemCount = input.itemCount
        shoppingList.date = validateDate(shoppingList.date, input.date)
        shoppingList.status = 'saved'
        await shoppingList.save()

        user.openList = shoppingList._id
        await user.save()
        return shoppingList.status
      } catch (e) {
        throwUserInputError(e, input)
      }
    },

    shoppingListFinish: async (root, { input }, context) => {
      const user = authenticateUser(context)
      try {
        if (input.status !== 'completed' && input.status !== 'cancelled') {
          throw new UserInputError('List status is not valid: ' + input.status)
        }

        const shoppingList = await ShoppingList.findById(user.openList)
        if (!shoppingList) {
          throw new UserInputError('User has no shoppingList.')
        }
        shoppingList.status = input.status
        shoppingList.list = input.list
        shoppingList.date = validateDate(shoppingList.date, input.date)
        await shoppingList.save()

        if (input.status === 'completed') {
          user.statistics = calculateStatistics(user.statistics, shoppingList)
        }

        user.history.unshift(shoppingList._id)
        user.openList = null
        await user.save()

        return await findAndPopulateUser(user)
      } catch (e) {
        throwUserInputError(e, input)
      }
    }
  }
}

module.exports = {
  typeDefs,
  shoppingListResolvers
}