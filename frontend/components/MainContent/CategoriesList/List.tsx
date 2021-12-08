import { useContext } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';
import { AsideContext } from '@/context';
import { CategoriesDocument } from '@/graphql/generated';

import { UnstyledButton } from '@/components/Buttons';
import {
  ListWrapper,
  ItemCardsWrapper,
  ItemCard
} from '@/components/CategoryItemsList';
import { Icon, AddIcon } from '@/components/Icons';


const List = () => {
try {
  const { changeView } = useContext(AsideContext);
  const [result] = useQuery({
    query: CategoriesDocument
  });

  if (result.fetching || result.error) {
    if (result.error) console.log(result.error);
    return <h3>loading...</h3>;
  }

  return (
    <>
      {result.data.categories.map(category =>
        <MainListWrapper key={category.id}>
          <h3>{category.name}</h3>
          <ItemCardsWrapper>
            {category.items.map(item =>
              <CardButton
                as={UnstyledButton}
                key={item.id}
                onClick={() => changeView('ITEM', item.id)}
              >
                <p>{item.name}</p>
                <Icon
                  justifySelf='end'
                  size={24}
                  fill={COLORS.grey[74]}
                >
                  <AddIcon />
                </Icon>
              </CardButton>
            )}
          </ItemCardsWrapper>
        </MainListWrapper>
      )}
    </>
  );
} catch (e) {
  console.log(e);
}  
};

const MainListWrapper = styled(ListWrapper)`
  @media ${QUERIES.mobile} {
    &:nth-child(2) {
      padding-top: 0;
    }
  }
`;

const CardButton = styled(ItemCard)`
  & :hover, & :focus {
    box-shadow: var(--shadow-secondary);

    svg {
      fill: var(--color-primary);
    }
  }
`;

export default List;