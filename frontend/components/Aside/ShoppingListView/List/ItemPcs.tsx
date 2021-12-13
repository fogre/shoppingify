import { useContext } from 'react';
import styled from 'styled-components';

import { ShoppingListContext } from '@/context';
import { Category, ListItem } from '@/graphql/generated';

import { IconButton } from '@/components/Buttons';
import { AddIcon, DeleteIcon, RemoveIcon } from '@/components/Icons';

interface Props {
  listItem: ListItem;
  category: Category;
  selected: boolean;
}

const Pcs = ({ listItem }: { listItem: ListItem }) => (
  <PcsWrapper>
    <PcsText>{listItem.pcs} pcs</PcsText>
  </PcsWrapper>
);

const ItemPcs = ({ category, listItem, selected }: Props) => {
  const { editState, changePcs, removeItem } = useContext(ShoppingListContext);

  if (!selected || !editState) {
    return (
      <Pcs listItem={listItem} />
    );
  }

  return (
    <PcsSelectedWrapper>
      <RemoveButton
        size={18}
        color={'white'}
        padding={10}
        onClick={() => removeItem(listItem, category)}
      >
        <DeleteIcon/>
      </RemoveButton>
      <IconButton
        size={24}
        color={'currentColor'}
        onClick={() => changePcs(listItem, category, -1)}
      >
        <RemoveIcon />
      </IconButton>
      <Pcs listItem={listItem} />
      <IconButton
        size={24}
        color={'currentColor'}
        onClick={() => changePcs(listItem, category, 1)}
      >
        <AddIcon />
      </IconButton>
    </PcsSelectedWrapper>
  );
};

const RemoveButton = styled(IconButton)`
  background-color: var(--color-primary);
  border-radius: var(--radius-normal);
  height: 100%;
  width: 100%;
`;

const PcsWrapper = styled.div`
  color: var(--color-primary);
  border: 2px solid;
  border-radius: 24px;
  padding: 7.5px 13px;
  font-size: var(--font-tiny);
  text-align: center;
  height: min-content;
`;

const PcsText = styled.p`
  min-width: 6ch;
`;

const PcsSelectedWrapper = styled.div`
  color: var(--color-primary);
  background-color: white;
  border-radius: var(--radius-normal);
  display: flex;
  align-items: center;
  gap: 7px;
  padding-right: 5px;
  height: 100%;
  width: max-content;
`;

export default ItemPcs;