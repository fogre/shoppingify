import styled from 'styled-components';

import { Icon, CalendarIcon } from '@/components/Icons';

const DateWithIcon = ({ date }: { date: string }) => (
  <Wrapper>
    <Icon
      size={22}
      fill='currentColor'
    >
      <CalendarIcon />
    </Icon>  
    <p>{date}</p>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-240);
  font-size: var(--font-tiny);
  gap: 5px;
`;

export default DateWithIcon;
