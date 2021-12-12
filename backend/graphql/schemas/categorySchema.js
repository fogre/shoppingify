const { gql } = require('apollo-server-express')
//models
const Category = require('../../models/category')
//utils
const { throwUserInputError } = require('../../utils/errorsAndValidations')

const typeDefs = gql`
  "Category object"
  type Category {
    id: ID!
    name: String!
    items: [ItemInCategory]
  }

  input CategoryInput {
    id: ID
    name: String!
  }

  extend type Query {
    "Get categories as an array with items. Optional search argument for category: name"
    categories(name: String): [Category!]!
  }
`

const categoryResolvers = {
  Query: {
    categories: async (root, args) => {
      try {
        return await Category.find(args).populate('items')
      } catch (e) {
        throwUserInputError(e, args)
      }
    }
  }
}

module.exports = {
  typeDefs,
  categoryResolvers
}