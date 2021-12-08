import styled from 'styled-components';

import EditButton from './EditButton';
import ListItems from './ListItems';

const List = () => {
  return (
    <Wrapper>
      <Heading>
        <h2>Shopping list</h2>
        <EditButton />
      </Heading>
      <ListItems />
    </Wrapper>
  );  
};

const Wrapper = styled.div`
  padding-top: var(--padding-main);
  height: 100%;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default List;