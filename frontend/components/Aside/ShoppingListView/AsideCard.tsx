import { useContext } from 'react';
import styled from 'styled-components';

import { AsideContext } from '@/context';

import { UnstyledButton } from '@/components/Buttons';
import { BottleIcon } from '@/components/Icons';

const AsideCard = () => {
  const { changeView } = useContext(AsideContext);

  return (
    <Wrapper>
      <BottleWrapper>
        <Bottle />
      </BottleWrapper>
      <ButtonWrapper>
        <p>Didn&apos;t find what you need?</p>
        <AsideButton
          onClick={() => changeView('NEW_ITEM')}
        >
          Add item
        </AsideButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-wine);
  border-radius: var(--radius-large);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  padding: 15px;
  justify-content: center;
`;

const BottleWrapper = styled.div`
  position: relative;
`;

const Bottle = styled(BottleIcon)`
  position: absolute;
  left: 0;
  top: -30px;
  height: min-content;
`;

const ButtonWrapper = styled.div`
  color: white;
  font-size: var(--font-medium);
  font-weight: 700;

  p {
    font-weight: inherit;
  }
`;

const AsideButton = styled(UnstyledButton)`
  border-radius: var(--radius-normal);
  font-size: var(--font-small);
  color: var(--color-black);
  background-color: white;
  padding: 11px 30px;
  margin-top: 10px;
  box-shadow: var(--shadow-primary);

  & :hover {
    box-shadow: var(--shadow-secondary);
  }
`;
export default AsideCard;