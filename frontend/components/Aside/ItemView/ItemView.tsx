import { useContext } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { AsideContext, NotificationContext, ShoppingListContext } from '@/context';
import { Item, ItemFindOneDocument } from '@/graphql/generated';

import { Button, BackIconButton } from '@/components/Buttons';
import { BottomActions, Scrollable, ScrollContent } from '../LayoutHelpers';

interface ItemViewBaseProps {
  item: Item | null;
  changeView: () => void;
  hideAsideView: () => void;
  children: React.ReactNode;
}

const ItemViewBase = ({ item, changeView, hideAsideView, children }: ItemViewBaseProps) => {
  const { addItem } = useContext(ShoppingListContext);
  const { showNotification } = useContext(NotificationContext);

  const handleAddToList = (item: Item): void => {
    if (item) {
      addItem(item);
      changeView('SHOPPING_LIST');
      hideAsideView();
      showNotification({
        type: 'success',
        message: 'Item added.'
      });
    }  
  };

  return (
    <Scrollable>
      <BackIconButton
        onClick={() => changeView('SHOPPING_LIST')}
      />
      {children}
      <BottomActions>
        <Button style={'white'}>
          delete
        </Button>
        <Button
          style={'primary'}
          disabled={item ? false : true}
          onClick={() => handleAddToList(item)}
        >
          Add to list
        </Button>
      </BottomActions>
    </Scrollable>
  );
};

const ItemView = () => {
  const { payload, changeView, hideAsideView } = useContext(AsideContext);

  const [result] = useQuery({
    query: ItemFindOneDocument,
    variables: { id: payload }
  });

  if (result.fetching || result.error) {
    return <ItemViewBase item={null} changeView={changeView} />;
  }

  const item: Item = result.data.itemFindOne;

  return (
    <ItemViewBase
      item={item}
      changeView={changeView}
      hideAsideView={hideAsideView}
    >
      <ScrollContent margin={30}>
        <ItemImage
          src={item.image ? item.image : '/groceries.png'}
          alt={`Image of ${item.name}`}
        />
        <ItemFieldWrapper>
          <ItemLabelField>name</ItemLabelField>
          <ItemName>{item.name}</ItemName>
        </ItemFieldWrapper>
        <ItemFieldWrapper>
          <ItemLabelField>category</ItemLabelField>
          <p>{item.category.name}</p>
        </ItemFieldWrapper>
        {item.note &&
          <ItemFieldWrapper>
            <ItemLabelField>note</ItemLabelField>
            <p>{item.note}</p>
          </ItemFieldWrapper>
        }
      </ScrollContent>
    </ItemViewBase>
  );
};

const ItemImage = styled.img`
  width: 100%;
  height: 220px;
  border-radius: var(--radius-large);
  object-fit: cover;
  object-position: top center;
`;

const ItemFieldWrapper = styled.div`
  font-size: var(--font-h3);
  padding-top: 30px;

  &:first-of-type {
    padding-top: 20px;
  }
`;
const ItemName = styled.p`
  font-size: var(--font-h2);
`;

const ItemLabelField = styled.label`
  font-size: var(--font-tiny);
  color: var(--color-grey-240);
`;

export default ItemView;