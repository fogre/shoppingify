const { gql } = require('apollo-server-express')
//models
const Category = require('../../models/category')

const typeDefs = gql`
  extend type Query {
    "Ping query to wake up the server"
    ping: String
  }
`

const pingResolvers = {
  Query: {
    ping: async () => {
      try {
        await Category.find({})
        return 'pong'
      } catch (e) {
        throw new Error('Error when contacting the database')
      }
    }
  }
}

module.exports = { typeDefs, pingResolvers }