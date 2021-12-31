const { setTestClient, loginDefaultUser } = require('./config/testClient')
const Category = require('../models/category')
const {
  SHOPPING_LIST,
  SHOPPING_LIST_FINISH,
  SHOPPING_LIST_SAVE
} = require('./queries/shoppingListQueries')

let categoriesAndItems, newList, testClient

const listFinish = async (date, status, list) => testClient.mutate(
  SHOPPING_LIST_FINISH,
  { variables: { input: {
    date: date,
    status: status,
    list: list
  } } }
)
const listSave = async list => testClient.mutate(
  SHOPPING_LIST_SAVE, { variables: { input: list } }
)

const expectUserStatistics = user => {
  expect(user.openList).toBeFalsy()
  expect(user.statistics.topItems.length).toBe(newList.itemCount)
  expect(user.statistics.topCategories.length).toBe(2)
  expect(user.statistics.monthlySummaries.length).toBe(1)
  expect(user.statistics.monthlySummaries[0].itemCount)
    .toBe(2)
}

beforeAll(async () => {
  testClient = await setTestClient()
  //login user
  const res = await loginDefaultUser(testClient)
  expect(res.errors).toBeFalsy()

  categoriesAndItems = await Category.find({})
  newList = {
    name: 'new shoppingList',
    date: '1995-12-17',
    list: [
      {
        category: categoriesAndItems[0]._id.toString(),
        items: [{
          item: categoriesAndItems[0].items[0].toString(),
          pcs: 1,
          completed: false
        }]
      },
      {
        category: categoriesAndItems[1]._id.toString(),
        items: [{
          item: categoriesAndItems[1].items[0].toString(),
          pcs: 2,
          completed: true
        }]
      }
    ],
    itemCount: 2
  }
})

describe('A ShoppingList can', () => {

  it('be saved for an user', async () => {
    let res = testClient.query(SHOPPING_LIST)
    expect(res.errors && res.data.shoppingList).toBeFalsy()

    res = await listSave(newList)
    expect(res.data.shoppingListSave).toBe('SAVED')
  })

  it('be queried and it retuns users openList', async () =>  {
    const res = await testClient.query(SHOPPING_LIST)
    expect(res.errors).toBeFalsy()
    const list = res.data.shoppingList
    expect(list.name).toBe(newList.name)
    expect(list.itemCount).toBe(newList.itemCount)
    expect(list.list.length).toBe(2)
    expect(list.list[0].category.name)
      .toBe(categoriesAndItems[0].name)
    expect(list.list[0].items.length).toBe(1)
    expect(list.list[1].items.length).toBe(1)
  })

  it('be finished and sets users openList, history and statistics', async () => {
    let res = await listFinish(newList.date, 'COMPLETED', newList.list)
    const user = res.data.shoppingListFinish

    expect(user.history.length).toBe(1)
    expect(user.history[0].name).toBe(newList.name)
    expect(user.history[0].status).toBe('COMPLETED')
    expect(user.history[0].list[0].category.name)
      .toBe(categoriesAndItems[0].name)
    expect(user.history[0].list[0].items[0].item.id)
      .toBe(categoriesAndItems[0].items[0].toString())
    expectUserStatistics(user)
  })

  it('not be finished if user has no saved ShoppingList', async () => {
    let res = await listFinish(newList.date, 'COMPLETED', newList.list)
    expect(res.errors[0].message).toBe('User has no shoppingList.')
    expect(res.data.listFinish).toBeFalsy()
  })

  it('not be finished if the status is wrong or date is in the past', async () => {
    let res = await listSave(newList)
    expect(res.data.shoppingListSave).toBe('SAVED')

    res = await listFinish(newList.date, 'SAVED', newList.list)
    expect(res.errors[0].message)
      .toBe('List status is not valid: saved')
    expect(res.data.listFinish).toBeFalsy()

    res = await listFinish('1995-11-03', 'CANCELLED', newList.list)
    expect(res.errors[0].message)
      .toBe('Your new date is in the past.')
    expect(res.data.listFinish).toBeFalsy()
  })

  it('be cancelled, saved to history but it doesent calculate User statistics', async () => {
    //list was saved on the previous test
    let res = await listFinish(newList.date, 'CANCELLED', newList.list)
    const user = res.data.shoppingListFinish

    expect(user.history.length).toBe(2)
    expect(user.history[0].status).toBe('CANCELLED')
    expectUserStatistics(user)
  })
})
