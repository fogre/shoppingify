import styled from 'styled-components';

import { COLORS } from '@/constants';

import UnstyledButton from './UnstyledButton';

interface props {
  style: string;
  children: React.ReactNode
}

const BACKGROUNDCOLOR = {
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  danger: COLORS.danger,
  white: COLORS.white
};

const Button = ({ style, children, ...delegated }: props) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const backgroundColor: string = BACKGROUNDCOLOR[style as keyof BACKGROUNDCOLOR];

  return (
    <DefaultButton
      style={{
        '--background-color': backgroundColor,
        '--text-color': style === 'white' ? 'black' : 'white'
      }}
      {...delegated}
    >
      {children}
    </DefaultButton>
  );
};

const DefaultButton = styled(UnstyledButton)`
  padding: 20px 25px;
  color: var(--text-color);
  background-color: var(--background-color);
  border-radius: var(--radius-normal);
  font-weight: 700;

  & :disabled {
    background-color: var(--color-grey-74);
  }
`;

export default Button;