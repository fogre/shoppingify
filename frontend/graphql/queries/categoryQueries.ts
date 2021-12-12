const CATEGORIES = /* GraphQL */`
	query Categories {
	  categories {
	    id
	    name
	    items {
	      id
	      name
	    }
	  }
	}
`;

export {
	CATEGORIES
};