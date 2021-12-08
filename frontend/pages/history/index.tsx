import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';
import { ShoppingList } from '@/graphql/generated';
import { UserContext } from '@/context';

import { getMainLayout } from '@/components/Layouts';
import Centered from '@/components/Centered';
import DateWithIcon from '@/components/DateWithIcon';
import { Icon, ArrowRightIcon } from '@/components/Icons';

const HistoryPage = () => {
  const { history } = useContext(UserContext);

  if (!history) {
    return null;
  }

  const historyEntries: Array<[string, Array<ShoppingList>]> = Object.entries(history);

  if (!historyEntries.length) {
    return (
      <Centered>
        <p>Your history is empty, start shopping!</p>
      </Centered>
    );
  }

  return (
    <>
      <Heading>Shopping history</Heading>
      {historyEntries.map(([name, list]) =>
        <HistoryWrapper key={name}>
          <HistoryName>{name}</HistoryName>
          {list.map(hstr =>
            <Link href={`/history/${name}?itemId=${hstr.id}`} key={hstr.id}>
              <HistoryCardLink>
                <p>{hstr.name}</p>
                <FlexWrapper>
                  <MobileFlexWrapper>
                    <DateWithIcon date={hstr.date} />
                    <StatusText status={hstr.status}>
                      {hstr.status}
                    </StatusText>
                  </MobileFlexWrapper>  
                  <Icon
                    size={32}
                    fill={COLORS.primary}
                  >
                    <ArrowRightIcon />
                  </Icon>  
                </FlexWrapper>
              </HistoryCardLink>
            </Link>
          )}
        </HistoryWrapper>
      )}
    </>
  );
};

HistoryPage.getLayout = getMainLayout;

const Heading = styled.h1`
  font-weight: 700;
`;

const HistoryWrapper = styled.div`
  margin-top: 40px;
`;

const HistoryName = styled.h3`
  font-size: var(--font-tiny);
  padding-bottom: 16px;
`;

const HistoryCardLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 16px 12px 16px 21px;
  border-radius: var(--radius-normal);
  box-shadow: var(--shadow-primary);
  margin-bottom: 28px;

  & :hover {
    cursor: pointer;
    box-shadow: var(--shadow-secondary);
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-tiny);
  gap: 20px;
`;

const MobileFlexWrapper = styled(FlexWrapper)`
  @media ${QUERIES.mobile} {
    display: none;
  }
`;

const StatusText = styled.p`
  color: ${p => p.status === 'COMPLETED'
    ? COLORS.secondary : COLORS.danger
  };
  border: 1px solid currentColor;
  border-radius: 8px;
  text-transform: lowercase;
  padding: 2px 7px;
  margin: 0;
`;

export default HistoryPage;