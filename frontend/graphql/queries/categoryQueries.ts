const CATEGORIES = /* GraphQL */`
	query Categories {
	  categories {
	    id
	    name
	    items {
	      id
	      name
	      note
	      image
	    }
	  }
	}
`;

export {
	CATEGORIES
};