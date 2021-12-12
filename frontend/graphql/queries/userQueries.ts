//fragment
const USER_STATISTICS = /* GraphQL */`
  fragment userStatistics on User {
    statistics {
      topItems {
        item {
          id
          name
        }
        percentage
      }
      topCategories {
        category {
          id
          name
        }
        percentage
      }
      monthlySummaries {
        month
        itemCount
      }
    }
  }
`;

const USER_HISTORY = /* GraphQL */`
  fragment userHistory on User {
    history {
      id
      name
      date
      status
      list {
        category {
          id
          name
        }
        items {
          item {
            id
            name
          }
          pcs
          completed
        }
      }
    }
  }
`;

const SHOPPING_LIST_FRAGMENT = /* GraphQL */`
  fragment userOpenList on User {
    openList {
      id
      name
      date
      itemCount
      status
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
  }
`;

//query
const USER = /* GraphQL */`
  ${USER_STATISTICS}
  ${USER_HISTORY}
  ${SHOPPING_LIST_FRAGMENT}
  query user {
    user {
      id
      email
      ...userOpenList
      ...userHistory
      ...userStatistics
    }
  }
`;

//mutations
const USER_CREATE = /* GraphQL */`
  mutation userCreate($email: String!, $password: String!) {
    userCreate(email: $email, password: $password) {
      email
    }
  }
`;

const USER_LOGIN = /* GraphQL */`
  ${USER_STATISTICS}
  ${USER_HISTORY}
  ${SHOPPING_LIST_FRAGMENT}
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      value
      user {
        id
        email
        ...userOpenList
        ...userHistory                
        ...userStatistics
      }
    }
  }
`;

export {
  USER,
  USER_CREATE,
  USER_LOGIN,
  USER_STATISTICS,
  USER_HISTORY
};