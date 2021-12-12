import { useContext } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import { AsideView, AsideContext, ShoppingListContext } from '@/context';

import MiddleActions from './MiddleActions';
import { IconButton } from '@/components/Buttons';
import { CartIcon, LogoIcon } from '@/components/Icons';


const ItemCount = () => {
  const { openList } = useContext(ShoppingListContext);

  if (!openList?.itemCount) {
    return null;
  }

  return (
    <ItemCountButton>
      {openList.itemCount}
    </ItemCountButton>
  );
};

const ItemCountButton = styled.p`
  font-size: var(--font-tiny);
  background: var(--color-danger);
  border-radius: var(--radius-tiny);
  color: white;
  position: absolute;
  top: -${6/16}rem;
  right: -6px;
  padding: 2px 6px;
`;

const Navigation = () => {
  const { changeView } = useContext(AsideContext);

  return (
    <Wrapper>
      <IconButton size={42}>
        <LogoIcon
          onClick={() => changeView(AsideView.User)}
        />
      </IconButton>

      <MiddleActions />
      
      <CartAction>
        <IconButton
          background={COLORS.primary}
          radius={50}
          size={22}
          padding={10}
          color={'white'}
          onClick={() => changeView(AsideView.List)}
        >
          <CartIcon />
          <ItemCount />
        </IconButton>
      </CartAction>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const CartAction = styled.div`
  position: relative;
`;

export default Navigation;