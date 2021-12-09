import { ChangeEvent, useContext, useState } from 'react';
import { useQuery } from 'urql';
import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';
import { AsideContext, NotificationContext } from '@/context';
import { Category, CategoriesDocument } from '@/graphql/generated';

import { getMainLayout } from '@/components/Layouts';
import { Icon, AddIcon, SearchIcon } from '@/components/Icons';
import { DefaultInput } from '@/components/Input';
import { UnstyledButton } from '@/components/Buttons';
import {
  ListWrapper,
  ItemCardsWrapper,
  ItemCard
} from '@/components/CategoryItemsList';

interface SearchIF {
  searchParams: string;
  changeSearchParams?: () => void;
}

const Header = ({ searchParams, changeSearchParams }: SearchIF) => {

  return (
    <Wrapper>
      <h1>
        <strong>Shoppingify</strong> allows you to take your
        shopping list where ever you go
      </h1>
      <SearchWrapper>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>  
        <Search
          width={250}
          type='text'
          borderColor={'transparent'}
          placeholder={'Search items'}
          value={searchParams}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeSearchParams(e)}
        />
      </SearchWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  --gap: 32px;
  display: flex;
  align-items: baseline;
  gap: var(--gap);
  width: 100%;

  @media ${QUERIES.tablet} {
    display: block;
  }

  @media ${QUERIES.mobile} {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  border-radius: var(--radius-normal);
  position: relative;
  background: white;
  margin-left: auto;

  @media ${QUERIES.tablet} {
    margin-top: var(--gap);
  }
`;

const Search = styled(DefaultInput)`
  padding-left: 42px;
  position: relative;
  background: transparent;
  width: 100%;
  min-width: 250px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 28%;
  left: 13px;
  fill: var(--color-grey-74);

  ${SearchWrapper}:hover & {
    fill: var(--color-grey-27);
  }
`;

const List = ({ searchParams }: SearchIF) => {
  const { changeView } = useContext(AsideContext);
  const { showNotification } = useContext(NotificationContext);
  const [result] = useQuery({
    query: CategoriesDocument
  });

  if (result.fetching || result.error) {
    if (result.error) {
      showNotification({
        type: 'error',
        message: result.error.message
      });
    }
    return <h3>loading...</h3>;
  }

  let categories: Category[] = result.data.categories;
  if (searchParams) {
    categories = result.data.categories.reduce((categories: Category[], c: Category) => {
      const items = c.items.filter(i => i.name.includes(searchParams));
      if (items.length) {
        categories.push({
          ...c,
          items
        });
      }
      return categories;
    }, []);
  }

  return (
    <>
      {categories.map(category =>
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

const Home = () => {
  const [searchParams, setSearchParams] = useState<string>('');

  const changeSearchParams = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchParams(e.target.value.toLowerCase());
  };

  return(
    <>
      <Header
        searchParams={searchParams}
        changeSearchParams={changeSearchParams}
      />
      <List
        searchParams={searchParams}
      />
    </>
  );
};

Home.getLayout = getMainLayout;

export default Home;