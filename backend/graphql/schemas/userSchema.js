const { gql, UserInputError } = require('apollo-server-express')
const { DateResolver } = require('graphql-scalars')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//models
const User = require('../../models/user')
//utils
const { SECRET } = require('../../utils/config')
const { findAndPopulateUser } = require('../../utils/userFindAndPopulate')
const {
  authenticateUser,
  throwUserInputError
} = require('../../utils/errorsAndValidations')

const typeDefs = gql`
  "Object for an array of most popular Items of an User"
  type TopItem {
    item: Item!
    percentage: Float
  }

  "Object for an array of most popular Categories of an User"
  type TopCategory {
    category: Category!
    percentage: Float
  }

  "Object for an array of monthly picked items of an User"
  type MonthlySummary {
    month: Date
    itemCount: Int
  }

  "User' TopItem, TopCategory and MonthlySummary statistics"
  type Statistics {
    topItems: [TopItem]
    topCategories: [TopCategory]
    monthlySummaries: [MonthlySummary]
  }
  
  "User info and her open shopping list, history and statistics"
  type User {
    id: ID
    email: String!
    openList: ShoppingList
    history: [ShoppingList]
    statistics: Statistics
  }

  "User with Oauth token"
  type UserWithToken {
    user: User!
    value: String!
  }

  extend type Query {
    user: User
  }

  extend type Mutation {
    "Create a new user. Required params: email, password."
    userCreate(email: String!, password: String!): User

    "Login user."
    userLogin(email: String!, password: String!): UserWithToken!
  }
`

const userResolvers = {
  Date: DateResolver,

  Query: {
    user: async (root, args, context) => {
      const user = authenticateUser(context)
      try {
        return await findAndPopulateUser(user)
      } catch(e) {
        console.log(e)
      }
    }
  },

  Mutation: {
    userCreate: async (root, args) => {
      if (args.password.length < 5) {
        throw new UserInputError('Password must be over 4 characters')
      }

      try {
        const passHash = await bcrypt.hash(args.password, 10)
        return await new User({
          email: args.email,
          passwordHash: passHash
        }).save()
      } catch (e) {
        throwUserInputError(e, args)
      }
    },

    userLogin: async (root, args) => {
      try {
        const user = await User.findOne({ email: args.email })

        if (!user || !(await bcrypt.compare(args.password, user.passwordHash))) {
          throw new UserInputError('Wrong credentials')
        }
        const userForRes = await findAndPopulateUser(user)

        return {
          user: userForRes,
          value: jwt.sign({ id: user._id }, SECRET)
        }
      } catch (e) {
        throwUserInputError(e)
      }
    }
  }
}

module.exports = {
  typeDefs,
  userResolvers
}
