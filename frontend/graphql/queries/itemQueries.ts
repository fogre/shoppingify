export const ITEM_FIND_BY_ID = /* GraphQL */`
	query itemFindOne($id: ID, $name: String) {
	  itemFindOne(id: $id, name: $name) {
	    id
	    name
	    note
	    image
	    category {
	    	id
	      name
	    }
	  }
	}
`;

export const ITEM_ADD_ONE = /* GraphQL */`
	mutation itemAddOne($input: ItemInput! ) {
	  itemAddOne(input: $input) {
	    name
	    id
	    note
	    category {
	      id
	    }
	  }
	}
`;