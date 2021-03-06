import { useContext } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { AsideView, AsideContext, NotificationContext, ShoppingListContext } from '@/context';
import { Item, ItemFindOneDocument } from '@/graphql/generated';

import Centered from '@/components/Centered';
import { Button, BackIconButton } from '@/components/Buttons';
import { BottomActions, Scrollable, ScrollContent } from '../LayoutHelpers';

interface ItemViewBaseProps {
  item?: Item | null;
  changeView: (view: AsideView) => void;
  hideAsideView?: () => void;
  children?: React.ReactNode;
}

const ItemViewBase = ({ item, changeView, hideAsideView, children }: ItemViewBaseProps) => {
  const { addItem } = useContext(ShoppingListContext);
  const { showNotification } = useContext(NotificationContext);

  const handleClick = () => {
    changeView(AsideView.List);
    hideAsideView();
  };

  const handleAddToList = (item: Item): void => {
    if (item) {
      addItem(item);
      handleClick();
      showNotification({
        type: 'success',
        message: 'Item added.'
      });
    }  
  };

  return (
    <Scrollable>
      <BackIconButton
        onClick={() => handleClick()}
      />
      {children}
      <BottomActions>
        <Button buttonType='white'>
          delete
        </Button>
        <Button
          buttonType='primary'
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
    variables: { id: payload.toString() }
  });

  if (result.fetching || result.error) {
    return (
      <ItemViewBase item={null} changeView={changeView}>
        <Centered>
          <p>Loading...</p>
        </Centered>
      </ItemViewBase>
    );
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