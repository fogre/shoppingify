const calculateStatistics = require('../utils/calcStatistics')

const shoppingList = {
  id: '61519144d48eb14a08d985c1',
  name: 'test list',
  status: 'saved',
  date: new Date(2010, 11, 2),
  list: [{
    category: '61519145d48eb14a08d985c1',
    items: [
      {
        item: '61519145d48eb14a08d985c9',
        pcs: 1
      },
      {
        item: '61519145d48eb14a08d985d1',
        pcs: 2
      }
    ]
  }],
  itemCount: 2
}

let userStats = {
  allCategoriesCount: 0,
  allItemsCount: 0,
  topItems: [],
  topCategories: [],
  monthlySummaries: []
}

let categoriesInTestList = shoppingList.list.length
let itemsInTestList = shoppingList.list[0].items.length

describe('When calculating statistics it', () => {

  it('adds correct stats for Users empty statistics', () => {
    const stats = calculateStatistics(userStats, shoppingList)

    expect(stats.topItems.length).toBe(itemsInTestList)
    expect(stats.topCategories.length).toBe(categoriesInTestList)
    expect(stats.topItems[0].percentage).toBe(1 / itemsInTestList * 100)
    expect(stats.topItems[1].percentage).toBe(1 / itemsInTestList * 100)
    expect(stats.topCategories[0].percentage).toBe(1 / categoriesInTestList * 100)
    expect(stats.monthlySummaries.length).toBe(1)
    expect(stats.monthlySummaries[0].itemCount).toBe(itemsInTestList)
    userStats = stats
  })

  it('adds correct stats when same item is added', () => {
    const newList = {
      ...shoppingList,
      itemCount: 1,
      list: [{
        category: shoppingList.list[0].category,
        items: [{
          item: shoppingList.list[0].items[0].item
        }]
      }]
    }
    categoriesInTestList += 1
    itemsInTestList += 1

    const stats = calculateStatistics(userStats, newList)
    expect(stats.topItems.length).toBe(userStats.topItems.length)
    expect(stats.topCategories.length).toBe(userStats.topCategories.length)
    expect(stats.topItems[0].percentage).toBe(2 / itemsInTestList * 100)
    expect(stats.topItems[1].percentage).toBe(1 / itemsInTestList * 100)
    expect(stats.topCategories[0].percentage).toBe(2 / categoriesInTestList * 100)
    expect(stats.monthlySummaries.length).toBe(1)
    expect(stats.monthlySummaries[0].itemCount).toBe(itemsInTestList)
    userStats = stats
  })

  it('adds correct stats when new category and items are added', () => {
    const newList = {
      ...shoppingList,
      itemCount: 3,
      list: [
        { ...shoppingList.list[0] },
        {
          category: 'newCat123',
          items: [{
            item: 'newItem123'
          }]
        }
      ]
    }
    categoriesInTestList += 2
    itemsInTestList += 3

    const stats = calculateStatistics(userStats, newList)
    expect(stats.topItems.length).toBe(userStats.topItems.length+1)
    expect(stats.topCategories.length).toBe(userStats.topCategories.length+1)
    expect(stats.topItems[0].percentage).toBe(3 / itemsInTestList * 100)
    expect(stats.topItems[2].percentage).toBe(1 / itemsInTestList * 100)
    expect(stats.topCategories[0].percentage).toBe(3 / categoriesInTestList * 100)
    expect(stats.topCategories[1].percentage).toBe(1 / categoriesInTestList * 100)
    expect(stats.monthlySummaries[0].itemCount).toBe(itemsInTestList)
    userStats = stats
  })

  it('calculates monthlySummaries correctly when different month is added', () => {
    const newList = {
      ...shoppingList,
      date: new Date(2011, 2, 2)
    }

    const stats = calculateStatistics(userStats, newList)
    expect(stats.monthlySummaries.length).toBe(2)
    expect(stats.monthlySummaries[0].itemCount).toBe(2)
    expect(stats.monthlySummaries[1].itemCount).toBe(userStats.monthlySummaries[0].itemCount)
    expect(stats.monthlySummaries[0].month).toBe(newList.date)
    expect(stats.monthlySummaries[1].month).toBe(shoppingList.date)
  })
})