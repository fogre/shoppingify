import styled from 'styled-components';

import { QUERIES } from '@/constants';

import { SearchIcon } from '/components/Icons';
import { DefaultInput } from '/components/Input';

const Header = () => {
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
          borderColor={'transparent'}
          placeholder={'search'}
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
  min-width: 200px;
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

export default Header;