import { useContext } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

import { COLORS } from '@/constants';
import { UserContext } from '@/context';
import { MonthlySummary, TopItem, TopCategory } from '@/graphql/generated';

import { getMainLayout } from '@/components/Layouts';
import Centered from '@/components/Centered';

interface TopField {
  name: string;
  percentage: number;
  type: string;
}

const TopField = ({ name, percentage, type }: TopField) => {
  const parsedVal = Math.round(percentage);

  return (
    <TopFieldWrapper>
      <TopFieldDetails>
        <TopFieldName>{name}</TopFieldName>
        <h3>{parsedVal}%</h3>
      </TopFieldDetails>
      <ProgressBarWrapper
        role='progressbar'
        aria-valuenow={parsedVal}
        aria-valuemin='0'
        aria-valuemax='100'
      >
        <Bar style={{
          '--width': `${parsedVal}%`,
          '--color': `${type === 'primary'
            ? COLORS.primary : COLORS.secondary}`
        }} />
      </ProgressBarWrapper>
    </TopFieldWrapper>
  );
};

const TopFieldWrapper = styled.div`
  margin-top: 24px;
`;

const TopFieldDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 14px;
`;

const TopFieldName = styled.p`
  font-size: var(--font-small);
`;

const ProgressBarWrapper = styled.div`
  background-color: var(--color-grey-74);
  border-radius: var(--radius-normal);
  height: 6px;
  width: 100%;
  overflow: hidden;
`;

const Bar = styled.div`
  background: var(--color);
  border-radius: var(--radius-normal);
  height: 100%;
  width: var(--width);
  max-width: 100%;
`;

const MonthlyChart = ({ summary }: { summary: MonthlySummary[] }) => {
  const parsedSummary: MonthlySummary[] = summary.slice(0, 7).reverse().map(s => {
    const date = new Date(s.month);
    const monthString = date.toLocaleString<string>('default', {
      month: 'long'
    });
    return {
      ...s,
      month: monthString
    };
  });

  return (
    <ResponsiveContainer
      width='100%'
      height={300}
    >
      <LineChart
        data={parsedSummary}
        margin={{ top: 5, left: 0, right: 0, bottom: 5 }}
      >
        <Line type='monotone' dataKey='itemCount' stroke={COLORS.primary} />
        <CartesianGrid stroke='#ccc' strokeDasharray='3 3'/>
        <XAxis dataKey='month' />
        <YAxis />
      </LineChart>
    </ResponsiveContainer>  
  );
};

const StatisticsPage = () => {
  const { statistics } = useContext(UserContext);
  
  if (!statistics) {
    return null;
  }

  if (!statistics.topItems.length || !statistics.topCategories.length) {
    return (
      <Centered>
        <p>No statistics yet, so better start shopping!</p>
      </Centered>
    );
  }

  const topItems: TopItem[] = statistics.topItems.slice(0, 3);
  const topCategories: TopCategory[] = statistics.topCategories.slice(0, 3);

  return (
    <>
      <TopFieldsGrid>
        <TopFieldsWrapper>
          <Heading>Top items</Heading>
          {topItems.map(item => 
            <TopField
              type={'primary'}
              name={item.item.name}
              percentage={item.percentage}
              key={item.item.name}
            />  
          )}
        </TopFieldsWrapper>
        <TopFieldsWrapper>  
          <Heading>Top categories</Heading>
          {topCategories.map(cat =>
            <TopField
              name={cat.category.name}
              percentage={cat.percentage}
              key={cat.category.name}
            />
          )}
        </TopFieldsWrapper>  
      </TopFieldsGrid>
      <MonthlyWrapper>
        <Heading>Monthly summary</Heading>
        <MonthlyChart summary={statistics.monthlySummaries} />
      </MonthlyWrapper>
    </>
  );
};

StatisticsPage.getLayout = getMainLayout;

const Heading = styled.h2`
  font-size: var(--font-h1);
  font-weight: 500;
  margin-bottom: 20px;
`;

const TopFieldsGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(
    auto-fill, minmax(min(250px, 100%), 1fr)
  );
  justify-content: space-between;

  @media(min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TopFieldsWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const MonthlyWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
`;

export default StatisticsPage;