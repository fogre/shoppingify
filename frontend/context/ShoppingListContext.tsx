import { useState, useEffect, createContext } from 'react';
import { useQuery } from 'urql';

import { listAndIndexes } from '@/utils/shoppingListUtils';
import {
  Category,
  List,
  ListItem,
  Item,
  ItemInListItem,
  ShoppingList,
  StatusEnum,
  UserDocument
} from '@/graphql/generated';

export interface NewShoppingList {
  name: string;
  list: List[];
  itemCount?: number;
  Date?: string;
  status?: StatusEnum;
}

interface ChangeListProps {
  (listItem: ListItem,
  category: Category,
  amount?: number): void;
}

interface ListContext {
  openList: ShoppingList | NewShoppingList,
  editState: boolean;
  addItem: (item: Item | ItemInListItem) => void;
  changeEditState: () => void;
  changeCompleted: (item: ListItem, category: Category) => void;
  changePcs: (item: ListItem, category: Category, amount: number) => void;
  changeStatus: (status: StatusEnum) => void;
  removeItem: (item: ListItem, category: Category) => void;
}

/*Context, actions and provider*/
export const ShoppingListContext = createContext<ListContext | null>(null);

const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
  const [openList, setOpenList] = useState<ShoppingList | NewShoppingList | null>();
  const [editState, setEditState] = useState<boolean>(true);

  const [result] = useQuery({
    query: UserDocument
  });

  useEffect(() => {
    if (result.data?.user?.openList) {
      setOpenList(result.data.user.openList);
      setEditState(false);
    } else if (result.data?.user) {
      setOpenList({
        name: '',
        list: [],
        itemCount: 0
      });
    }
  }, [result]);

  const addItem = (item: ItemInListItem) => {
    const newItem: ListItem = {
      completed: false,
      pcs: 1,
      item: item
    };

    const { list, categoryIndex, itemIndex } = listAndIndexes(openList, newItem, item.category);
    let itemCount = openList.itemCount;

    if (itemIndex >= 0) { //if item already exists, just add pcs
      list[categoryIndex].items[itemIndex].pcs += 1;
    } else if (categoryIndex >= 0) { //if category exists, add item to category
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      list[categoryIndex].items.push(newItem);
      itemCount += 1;
    } else {
      const newCategory: List = {
        category: item.category,
        items: [newItem]
      };
      list.push(newCategory);
      itemCount +=1;
    }
    setOpenList({ ...openList, list, itemCount });
  };

  const changeCompleted: ChangeListProps = (listItem, category) => {
    const { list, categoryIndex, itemIndex } = listAndIndexes(openList, listItem, category);

    if (itemIndex < 0) {
      return;
    }
    list[categoryIndex].items[itemIndex].completed = 
      !list[categoryIndex].items[itemIndex].completed;
    setOpenList({ ...openList, list });
  };

  const changeEditState = () => {
    setEditState(!editState);
  };

  const changePcs: ChangeListProps = (listItem, category, amount) => {
    //eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    if ((listItem.pcs + amount) < 1) { //items pcs should never be < 1
      return;
    }

    const { list, categoryIndex, itemIndex } = listAndIndexes(openList, listItem, category);

    if (itemIndex < 0) {
      return;
    }
    list[categoryIndex].items[itemIndex].pcs += amount;
    setOpenList({ ...openList, list });
  };

  const changeStatus = (status: StatusEnum) => {
    setOpenList({
      ...openList,
      status
    });
  };

  const removeItem: ChangeListProps = (listItem, category) => {
    const { list, categoryIndex, itemIndex } = listAndIndexes(openList, listItem, category);

    if (itemIndex < 0) {
      return;
    }

    if (list[categoryIndex].items.length === 1) {
      list.splice(categoryIndex, 1);
    } else {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const newItems: ListItem[] = list[categoryIndex].items.filter(
        i => i.item.name !== listItem.item.name
      );
      list[categoryIndex].items = newItems;
    }
    setOpenList({
      ...openList,
      list,
      itemCount: openList.itemCount - 1
    });
  };

  return (
    <ShoppingListContext.Provider value={{
      addItem,
      changeCompleted,
      changeEditState,
      changePcs,
      changeStatus,
      editState,
      openList,
      removeItem
    }}>
      {children}
    </ShoppingListContext.Provider>  
  );
};

export default ShoppingListProvider;