import styled from 'styled-components';
import UnstyledButton from '../UnstyledButton';

import { BackArrowIcon } from '@/components/Icons';

interface Props {
  size: number;
  color: string;
  background: string;
  padding: number;
  radius: number;
  children: React.ReactNode;
}

export const IconButton = ({ size, color, background, padding, radius, children, ...delegated }: Props) => (
  <Button
    style={{
      '--size': `${size}px`,
      '--color': color,
      '--background': background,
      '--padding': `${padding}px`,
      '--radius': `${radius}%`
    }}
    {...delegated}
  >
    {children}
  </Button>
);

const Button = styled(UnstyledButton)`
  color: var(--color, inherit);
  border-radius: var(--radius, 0);
  padding: var(--padding, 7px);
  background: var(--background);

  svg {
    fill: currentColor;
    width: var(--size);
    height: var(--size);
  }
`;

export const BackIconButton = ({ ...delegated }) => (
  <BackButtonWrapper {...delegated}>
    <BackArrow />
    back
  </BackButtonWrapper>
);

const BackButtonWrapper = styled(IconButton)`
  display: flex;
  align-items: center;
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-small);
`;

const BackArrow = styled(BackArrowIcon)`
  transform: rotate(180deg);
`;