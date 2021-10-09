const { gql } = require('apollo-server-express')

//fragment
const USER_STATISTICS = gql`
  fragment userStatistics on User {
    statistics {
      topItems {
        item {
          name
        }
        percentage
      }
      topCategories {
        category {
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
`

//query
const USER = gql`
  ${USER_STATISTICS}
  query user {
    user {
      openList {
        name
      }
      history {
        name
        list {
          category {
            name
          }
          items {
            item {
              id
              name
            }
          }
        }
      }
      ...userStatistics
    }
  }
`

//mutations
const USER_CREATE = gql`
  mutation userCreate($email: String!, $password: String!) {
    userCreate(email: $email, password: $password) {
      email
      openList {
        id
      }
      history {
        itemCount
      }
      statistics {
        monthlySummaries {
          itemCount
        }
      }
    }
  }
`

const USER_LOGIN = gql`
  ${USER_STATISTICS}
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      value
      user {
        email
        openList {
          name
        }
        history {
          name
        }
        ...userStatistics
      }
    }
  }
`

module.exports = {
  USER, USER_CREATE, USER_LOGIN
}