const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const http = require('http')
const merge = require('lodash.merge')
//graphQl schemas
const { typeDefs: categoryTD, categoryResolvers } = require('./schemas/categorySchema')
const { typeDefs: itemTD, itemResolvers } = require('./schemas/itemSchema')
const { typeDefs: shoppingListTD, shoppingListResolvers } = require('./schemas/shoppingListSchema')
const { typeDefs: userTD, userResolvers } = require('./schemas/userSchema')
const { typeDefs: pingTD, pingResolvers } = require('./schemas/pingSchema')
//utils
const { verifyCurrentUser } = require('../utils/errorsAndValidations')

//express
const app = express()
const httpServer = http.createServer(app)

//Graphql Server
const baseTypeDefs = gql`
  type Query
  type Mutation
`
const createApolloServer = async () => {

  const server = new ApolloServer({
    typeDefs: [
      baseTypeDefs,
      categoryTD,
      itemTD,
      shoppingListTD,
      userTD,
      pingTD
    ],
    resolvers: merge(
      {},
      categoryResolvers,
      itemResolvers,
      shoppingListResolvers,
      userResolvers,
      pingResolvers
    ),
    context: async ({ req }) => {
      const currentUser = await verifyCurrentUser(req)
      return { currentUser }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/'
  })

  return server
}

const startServer = async (server, port) => {
  await new Promise(resolve => httpServer.listen({ port: port }, resolve))
  console.log(`🚀 Server ready at :${port}${server.graphqlPath}`)
}

module.exports = {
  createApolloServer,
  startServer
}