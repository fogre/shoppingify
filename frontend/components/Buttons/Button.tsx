import styled from 'styled-components';

import { COLORS, QUERIES } from '@/constants';

import UnstyledButton from './UnstyledButton';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonType?: string;
  children?: React.ReactNode;
}

const BACKGROUNDCOLOR = {
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  danger: COLORS.danger,
  white: COLORS.white
};

const Button = ({ buttonType, children, ...props }: ButtonProps): JSX.Element => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const backgroundColor: string = BACKGROUNDCOLOR[buttonType];

  return (
    <DefaultButton
      style={{
        '--background-color': backgroundColor,
        '--text-color': buttonType === 'white' ? 'black' : 'white'
      } as React.CSSProperties}
      {...props}
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

  @media ${QUERIES.mobile} {
    padding: 15px 20px;
  }
`;

export default Button;