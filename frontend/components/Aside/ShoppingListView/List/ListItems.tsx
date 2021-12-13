import { useState, useContext } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import { ShoppingListContext } from '@/context';
import { Category, ListItem } from '@/graphql/generated';

import { IconButton } from '@/components/Buttons';
import { CheckBoxIcon, CheckBoxCheckedIcon } from '@/components/Icons';
import ItemPcs from './ItemPcs';

interface ListItemProps {
  listItem: ListItem;
  category: Category;
}

const CheckBox = ({ listItem, category }: ListItemProps) => {
  const { editState, changeCompleted } = useContext(ShoppingListContext);

  if (editState) {
    return null;
  }

  return (
    <CheckBoxWrapper>
      <IconButton
        size={24}
        color={COLORS.primary}
        onClick={() => changeCompleted(listItem, category)}
      >
        {listItem.completed
          ? <CheckBoxCheckedIcon />
          : <CheckBoxIcon />
        }  
      </IconButton>
    </CheckBoxWrapper>  
  );
};

const CheckBoxWrapper = styled.div`
  margin-right: 10px;
`;

const SingleItem = ({ listItem, category }: ListItemProps) => {
  const [selected, setSelected] = useState<boolean>(true);
  const { editState } = useContext(ShoppingListContext);

  return (
    <ul
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
    >
      <ItemListWrapper>
        <CheckBox
          category={category}
          listItem={listItem}
        />
        <ItemName checked={!editState && listItem.completed}>
          {listItem.item.name}
        </ItemName>
        <ItemPcs
          category={category}
          listItem={listItem}
          selected={selected}
        />
      </ItemListWrapper>
    </ul>
  );
};

const ItemListWrapper = styled.li`
  font-size: var(--font-h3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 45px;

  &:first-of-type {
    margin-top: 15px;
  }
`;

const ItemName = styled('p')<{checked: boolean}>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-right: 5px;
  text-decoration: ${p => p.checked
    ? 'line-through': 'none'
  };
`;

const ListItems = () => {
  const { openList } = useContext(ShoppingListContext);

  if (!openList || !openList.list.length) {
    return (
      <CenteredWrapper>
        <p>no items</p>
      </CenteredWrapper>  
    );
  }

  return (
    <CategoryList>
      {openList.list.map(l =>
        <CategoryListItem key={l.category.name}>
          <CategoryHeading>{l.category.name}</CategoryHeading>
          {l.items.map(i =>
            <SingleItem
              key={i.item.name}
              listItem={i}
              category={l.category}
            />
          )}
        </CategoryListItem>
      )}
    </CategoryList>
  );
};

const CenteredWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: var(--font-h3);
  font-weight: 700;
  color: var(--color-grey-27);
`;

const CategoryList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  ul {
   list-style-type: none;
   margin: 0;
   padding: 0;
  }
`;

const CategoryListItem = styled.li`
  --list-padding-top: 50px;
  padding-top: var(--list-padding-top);

  &:first-of-type {
    padding-top: var(--padding-main);
  }

  &:last-of-type {
    margin-bottom: 16px;
  }
`;

const CategoryHeading = styled.h4`
  color: var(--color-grey-51);
  font-size: var(--font-small);
`;

export default ListItems;