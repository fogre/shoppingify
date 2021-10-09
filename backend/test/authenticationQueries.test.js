const { setTestClient } = require('./config/testClient')
const { USER } = require('./queries/userQueries')
const { SHOPPING_LIST } = require('./queries/shoppingListQueries')

let testClient

beforeAll(async () => {
  testClient = await setTestClient()
})

const expectAuthError = (res, queryName) => {
  expect(res.errors[0].message).toBe('not authenticated')
  expect(res.data[queryName]).toBeFalsy()
}

describe('Queries that require user auth will throw error in', () => {

  it('User resolvers', async () => {
    const res = await testClient.query(USER)
    expectAuthError(res, 'user')
  })

  it('ShoppingList resolvers', async () => {
    let res = await testClient.query(SHOPPING_LIST)
    expectAuthError(res, 'shoppingList')
  })
})

