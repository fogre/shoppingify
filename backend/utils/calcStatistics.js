const { sameYearAndMonth } = require('./errorsAndValidations')

/*
  Check if the months are the same, if so add to that months itemCount
  If not or monthlySummaries is empty, push to the beginning of monthlySummaries array
  If shoppingList month is in the past, throw error
*/
const countMonthlyStats = (statistics, shoppingList) => {
  const mostRecentDateInDB = statistics.monthlySummaries.length
    ? statistics.monthlySummaries[0].month
    : null

  if (sameYearAndMonth(mostRecentDateInDB, shoppingList.date)) {
    statistics.monthlySummaries[0].itemCount += shoppingList.itemCount
  } else {
    statistics.monthlySummaries.unshift({
      month: shoppingList.date,
      itemCount: shoppingList.itemCount
    })
  }
}

// Caclulate percentages for topTypes and then sorts by it
const calcPercentageAndSort = (statistics, topType, allTypeCount) => {
  statistics[topType] = statistics[topType].map(t => {
    return {
      ...t,
      percentage: t.count / allTypeCount * 100
    }
  })
  statistics[topType].sort((a,b) =>
    b.percentage - a.percentage
  )
}

/*
  Calculates the statistics for User.
  Takes parameters User.statistics and ShoppingList to calculate new statistics
*/
const calculateStatistics = (statsInDB, shoppingList) => {
  const statistics = {
    allItemsCount: statsInDB.allItemsCount,
    allCategoriesCount: statsInDB.allCategoriesCount,
    topItems: [...statsInDB.topItems],
    topCategories: [...statsInDB.topCategories],
    monthlySummaries: [...statsInDB.monthlySummaries]
  }

  // calc monthly summary
  countMonthlyStats(statistics, shoppingList)
  // calc allItemsCount, allCategoriesCount
  statistics.allCategoriesCount += shoppingList.list.length
  statistics.allItemsCount += shoppingList.itemCount

  // calculate topItems and topCategories count fields and add new items to those
  for (const listItem of shoppingList.list) {
    const categoryIndex = statistics.topCategories.findIndex(
      c => c.category === listItem.category
    )
    if (categoryIndex >= 0) {
      statistics.topCategories[categoryIndex].count += 1
    } else {
      statistics.topCategories.push({
        category: listItem.category,
        count: 1
      })
    }

    for (const item of listItem.items) {
      const itemIndex = statistics.topItems.findIndex(
        i => i.item === item.item
      )
      if (itemIndex >= 0) {
        statistics.topItems[itemIndex].count += 1
      } else {
        statistics.topItems.push({
          item: item.item,
          count: 1
        })
      }
    }
  }

  // calculate percentages and sort the arrays by percentage
  calcPercentageAndSort(
    statistics, 'topItems', statistics.allItemsCount
  )
  calcPercentageAndSort(
    statistics, 'topCategories', statistics.allCategoriesCount
  )

  return statistics
}

module.exports = calculateStatistics