import {
	Category,
	List,
	ListItem,
	ListInput,
	ShoppingList,
	ShoppingListSaveInput
} from '@/graphql/generated';

//Helpers to find category and item indexes from a ShoppingList
interface ListAndIndexesParams {
  openList: ShoppingList;
  listItem: ListItem;
  category: Category;
}

interface ListAndIndexesReturn {
  list: List[];
  categoryIndex: number;
  itemIndex: number;
}

export const listAndIndexes = (openList, listItem, category: ListAndIndexesParams): ListAndIndexesReturn => {
  let list: List[] = [];
  let itemIndex = -1;

  if (openList && openList.list) {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    list = [...openList.list];
  }
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const categoryIndex = list.findIndex(l => l.category.name === category.name);

  if (list[categoryIndex] && list[categoryIndex].items) {
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    itemIndex = list[categoryIndex].items.findIndex(
      i => i.item.name === listItem.item.name
    );
  }  
  return { list, categoryIndex, itemIndex };
};

//helper to parse shoppinglist before sending it to the server (to ShoppingListInput form)
export const parseList = (shoppingList: ShoppingList): ShoppingListSaveInput => {
	const list: ListInput[] = [];
	const date = new Date();
	const dateString = date.toISOString().split('T')[0];

	for (const listItem of shoppingList.list) {
		if (listItem.__typename) {
			delete listItem.__typename;
		}

		const newListItem: ListInput = {
			category: listItem.category.id,
			items: []
		};

		for (const item of listItem.items) {
			if (item.__typename) {
				delete item.__typename;
			}

			newListItem.items.push({
				...item,
				item: item.item.id
			});
		}

		list.push(newListItem);
	}

	const newList = {
		...shoppingList,
		list: list,
		date: dateString
	};
	delete newList.__typename;
	return newList;
};