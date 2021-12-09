const { gql } = require('apollo-server-express')

const typeDefs = gql`
  extend type Query {
    "Ping query to wake up the server"
    ping: String
  }
`

const pingResolvers = {
  Query: {
    ping: () => {
      return 'pong'
    }
  }
}

module.exports = { typeDefs, pingResolvers }