import { useContext } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import { AsideContext } from '@/context';

import ItemView from './ItemView';
import NewItemView from './NewItemView';
import ShoppingListView from './ShoppingListView';
import UserView from './UserView';

const BACKGROUNDCOLOR = {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  NEW_ITEM: COLORS.grey[95],
  ITEM: 'white',
  SHOPPING_LIST: COLORS.orangeLight,
  USER: 'white'
};

const Aside = () => {
  const { asideView } = useContext(AsideContext);
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const backgroundColor: string | undefined = BACKGROUNDCOLOR[asideView];
  let ComponentToView;

  if (!asideView || asideView === 'SHOPPING_LIST') {
    ComponentToView = ShoppingListView;
  } else if (asideView === 'ITEM') {
    ComponentToView = ItemView;
  } else if (asideView === 'NEW_ITEM') {
    ComponentToView = NewItemView;
  } else if (asideView === 'USER') {
    ComponentToView = UserView;
  } else {
    throw new Error('Aside view is not right');
  }

  return (
    <Wrapper
      style={{
        /* @ts-ignore */
        '--background-color': backgroundColor
      }}>
      <ComponentToView />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  --bottom-actions-height: 130px; ${/*height of container at the bottom of Aside*/''}
  height: 100%;
  background-color: var(--background-color, inherit);
`;

export default Aside;