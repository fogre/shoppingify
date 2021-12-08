import styled from 'styled-components';

import { QUERIES } from '@/constants';

export const ListWrapper = styled.div`
  padding-top: 60px;

  & *::first-letter {
    text-transform: uppercase;
  }

  @media ${QUERIES.mobile} {
    padding-top: var(--padding-top);
  }
`;

export const ItemCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(182px, 100%), 1fr)
  );
  gap: 6px 19px;
  width: 100%;

  h2 {
    font-weight: 500;
  }

  @media ${QUERIES.tablet} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(130px, 100%), 1fr)
    );
  }
`;

export const ItemCard = styled.div`
  line-height: 20px;
  background: white;
  padding: 13px 16px;
  border-radius: var(--radius-normal);
  box-shadow: var(--shadow-primary);
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 0.35fr;
  height: min-content;

  @media ${QUERIES.mobile} {
    padding: 13px 14px;
    font-size: var(--font-small);
  }
`;