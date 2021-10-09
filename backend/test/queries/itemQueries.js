const { gql } = require('apollo-server-express')

//fragments
const ALL_ITEM_FIELDS = gql`
  fragment allItemFields on Item {
    id
    name
    note
    image
    category {
      name
      id
    }
  }  
`

//queries
const ITEMS = gql`
  ${ALL_ITEM_FIELDS}
  query items($name: String) {
    items(name: $name) {
      ...allItemFields
    }  
  }
`
//mutations
const ITEM_ADD = gql`
  ${ALL_ITEM_FIELDS}
  mutation itemAdd($input: ItemInput!) {
    itemAddOne(input: $input) {
      ...allItemFields
    }
  }
`

module.exports = {
  ITEMS,
  ITEM_ADD
}