const { gql } = require('apollo-server-express')

//fragments
const LIST_BASE_FIELDS = gql`
  fragment listBaseFields on ShoppingList {
    id
    name
    date
    status
    itemCount
  }
`

const LIST_ALL_FIELDS = gql`
  ${LIST_BASE_FIELDS}
  fragment listAllFields on ShoppingList {
    ...listBaseFields
    list {
      category {
        id
        name
      }
      items {
        completed
        pcs
        item {
          name
        }
      }
    }
  }
`

//query
const SHOPPING_LIST = gql`
  ${LIST_ALL_FIELDS}
  query ShoppingList {
    shoppingList {
      ...listAllFields
    }
  }
`
//mutation
const SHOPPING_LIST_FINISH = gql`
  mutation finishList($input: ShoppingListFinishInput) {
    shoppingListFinish(input: $input)
  }
`
const SHOPPING_LIST_SAVE = gql`
  mutation saveList($input: ShoppingListSaveInput) {
    shoppingListSave(input: $input)
  }
`

module.exports = {
  SHOPPING_LIST,
  SHOPPING_LIST_FINISH,
  SHOPPING_LIST_SAVE
}