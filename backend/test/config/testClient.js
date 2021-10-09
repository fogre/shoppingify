const { createTestClient } = require('apollo-server-integration-testing')

const { createApolloServer } = require('../../graphql/createApolloServer')
const { devUser } = require('../../data/defaultData')
const { USER_LOGIN } = require('../queries/userQueries')

//Set test client for integration testing the server
const setTestClient = async () => {
  const apolloServer = await createApolloServer()
  const { query, mutate, setOptions } = createTestClient({
    apolloServer,
  })
  return { query, mutate, setOptions }
}

//Login helper function
const loginDefaultUser = async testClient => {
  const res = await testClient.mutate(
    USER_LOGIN, { variables: { ...devUser } }
  )

  testClient.setOptions({
    request: {
      headers: {
        authorization: `bearer ${res.data.userLogin.value}`
      }
    }
  })

  return res
}

module.exports = {
  setTestClient,
  loginDefaultUser
}