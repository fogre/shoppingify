import { USER_HISTORY, USER_STATISTICS } from './userQueries';

//fragments
const LIST_BASE_FIELDS = /* GraphQL */`
  fragment listBaseFields on ShoppingList {
    id
    name
    date
    status
    itemCount
  }
`;

const LIST_ALL_FIELDS = /* GraphQL */`
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
          id
          name
        }
      }
    }
  }
`;
//query
const SHOPPING_LIST = /* GraphQL */`
  ${LIST_ALL_FIELDS}
  query ShoppingList {
    shoppingList {
      ...listAllFields
    }
  }
`;

//mutation
const SHOPPING_LIST_SAVE = /* GraphQL */`
  mutation ShoppingListSave($input: ShoppingListSaveInput) {
    shoppingListSave(input: $input) 
  }
`;

const SHOPPING_LIST_FINISH = /* GraphQL */`
  ${USER_STATISTICS}
  ${USER_HISTORY}
  mutation ShoppingListFinish($input: ShoppingListFinishInput) {
    shoppingListFinish(input: $input) {
      id
      email
      openList {
        name
      }
      ...userHistory
      ...userStatistics
    }
  }
`;



export { SHOPPING_LIST, SHOPPING_LIST_SAVE, SHOPPING_LIST_FINISH };