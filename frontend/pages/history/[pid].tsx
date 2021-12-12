import { useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { UserContext } from '@/context';

import { getMainLayout } from '@/components/Layouts';
import { BackIconButton } from '@/components/Buttons';
import DateWithIcon from '@/components/DateWithIcon';
import {
  ListWrapper,
  ItemCardsWrapper,
  ItemCard
} from '@/components/CategoryItemsList';

const HistoryItem = () => {
  const router = useRouter();
  const { history } = useContext(UserContext);
  const { pid, itemId } = router.query;

  if (!history || !history[pid as string]) {
    return null;
  }

  const historyItem = history[pid as string]
    .find(h => h.id === itemId);
  
  if (!historyItem) {
    router.push('/history')
      .catch(e => console.log(e));
  }
  
  return (
    <>
      <BackIconButton onClick={() => router.push('/history')} />
      <Heading>{historyItem.name}</Heading>
      <DateWithIcon date={historyItem.date} />
      {historyItem.list.map(hstr =>
        <ListWrapper key={hstr.category.name}>
          <h3>{hstr.category.name}</h3>
          <ItemCardsWrapper>
          {hstr.items.map(listItem =>
            <ItemCard key={listItem.item.name}>
              <p>{listItem.item.name}</p>
              <PcsText><strong>{listItem.pcs}</strong> pcs</PcsText>
            </ItemCard>
          )}
          </ItemCardsWrapper>
        </ListWrapper>
      )}
    </>
  );
};

HistoryItem.getLayout = getMainLayout;

const Heading = styled.h1`
  font-weight: 700;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const PcsText = styled.p`
  text-align: right;
  font-size: var(--font-tiny);
  color: var(--color-primary);
`;

export default HistoryItem;