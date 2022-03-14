const { setTestClient, loginDefaultUser } = require('./config/testClient')
const Category = require('../models/category')
const { ITEMS, ITEM_ADD } = require('./queries/itemQueries')

let categories, testClient
const newDefaultItem = { name: 'newItem', note: 'a new nice item' }

const itemAddOne = async vars => testClient.mutate(
  ITEM_ADD, { variables: { input: vars } }
)

beforeAll(async () => {
  testClient = await setTestClient()
  //login user
  const loginRes = await loginDefaultUser(testClient)
  expect(loginRes.data.userLogin.value).toBeTruthy()

  categories = await Category.find({})
  expect(categories.length).toBeTruthy()
})

describe('An Item can', () => {

  it('be created with valid item fields for existing category', async () => {
    const cat = categories[0]

    const res = await itemAddOne({
      ...newDefaultItem,
      category: { name: cat.name }
    })
    expect(res.errors).toBeFalsy()

    const resItem = res.data.itemAddOne
    expect(resItem.name).toBe(newDefaultItem.name.toLowerCase())
    expect(resItem.note).toBe(newDefaultItem.note)
    expect(resItem.category.name).toBe(cat.name)
    expect(resItem.category.id).toBe(cat._id.toString())

    const catInDB = await Category.findById(cat._id)
    expect(catInDB.items.length).toBe(cat.items.length+1)
    expect(catInDB.items.find(i => i._id.toString() === resItem.id))
      .toBeTruthy()
  })

  it('be created with valid fields and a new category is added', async () => {
    const catLength = categories.length
    const newItemWithNewCategory = {
      name: 'A nice new item',
      category: { name: 'A new category' }
    }

    const res = await itemAddOne(newItemWithNewCategory)
    expect(res.errors).toBeFalsy()
    expect(res.data.itemAddOne.name)
      .toBe(newItemWithNewCategory.name.toLowerCase())
    const catsInDb = await Category.find({})
    expect(catsInDb.length).toBe(catLength+1)
    const addedCat = catsInDb.find(
      c => c._id.toString() === res.data.itemAddOne.category.id
    )
    expect(addedCat).toBeTruthy()
    categories = catsInDb
  })

  it('not be created if item with same name already exists', async () => {
    const res = await itemAddOne({
      ...newDefaultItem,
      category: { name: categories[1].name }
    })
    expect(res.data.itemAddOne).toBeFalsy()
    expect(res.errors).toBeTruthy()
    expect(res.errors[0].message.includes('An item with name'))
      .toBeTruthy()
  })

  it('be created with valid image url', async () => {
    const res = await itemAddOne({
      name: 'anotherNewItem',
      note: 'just some stuff',
      image: 'https://i.imgur.com/hVFcyrj.jpeg',
      category: { name: categories[1].name }
    })
    expect(res.data.itemAddOne).toBeTruthy()
    expect(res.errors).toBeFalsy()
  })

  it('not be created with invalid image url', async () => {
    const res = await itemAddOne({
      ...newDefaultItem,
      image: 'https://fake.com/wrongurl',
      category: { name: categories[1].name }
    })
    expect(res.data.itemAddOne).toBeFalsy()
    expect(res.errors).toBeTruthy()
    expect(res.errors[0].message.includes('Invalid Imgur image url'))
      .toBeTruthy()
  })

  it('be queried from the server and the response populates categories', async () => {
    let res = await testClient.query(ITEMS)
    expect(res.errors).toBeFalsy()
    expect(res.data.items.length).toBeTruthy()
    let singleItem = res.data.items[0]
    expect(singleItem.name).toBeTruthy()
    expect(
      singleItem.category.name
      && singleItem.category.id
    ).toBeTruthy()

    res = await testClient.query(
      ITEMS, { variables: { name: newDefaultItem.name } }
    )
    expect(res.errors).toBeFalsy()
    expect(res.data.items[0]).toBeTruthy()
  })
})