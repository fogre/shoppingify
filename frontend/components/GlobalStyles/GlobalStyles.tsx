import { createGlobalStyle } from 'styled-components';

import { ResetBrowserDefaults } from './cssReset';

import { COLORS } from '@/constants';

export const GlobalStyle = createGlobalStyle`
  ${ResetBrowserDefaults}

  html {
    --reach-dialog: 1;
    isolation: isolate;

    --color-black: ${COLORS.black};
    --color-danger: ${COLORS.danger};
    --color-grey-27: ${COLORS.grey[27]};
    --color-grey-51: ${COLORS.grey[51]};
    --color-grey-74: ${COLORS.grey[74]};
    --color-grey-95: ${COLORS.grey[95]};
    --color-grey-240: ${COLORS.grey[240]};
    --color-grey-270: ${COLORS.grey[270]};
    --color-orange-light: ${COLORS.orangeLight};
    --color-primary: ${COLORS.primary};
    --color-secondary: ${COLORS.secondary};
    --color-white: ${COLORS.white};
    --color-wine: ${COLORS.wine};

    --font-tiny: ${12/16}rem;
    --font-small: ${14/16}rem;
    --font-medium: 1rem;
    --font-h1: ${26/16}rem;
    --font-h2: ${24/16}rem;
    --font-h3: ${18/16}rem;

    --radius-tiny: 4px;
    --radius-small: 8px;
    --radius-normal: 12px;
    --radius-large: 24px;

    --shadow-style: 0px 2px 12px;
    --shadow-primary: var(--shadow-style) hsla(0, 0%, 0%, 0.05);
    --shadow-secondary: var(--shadow-style) hsla(0, 0%, 0%, 0.3);
  }

  body {
    position: relative;
    font-family: 'Quicksand', sans-serif;
  }

  html, body, div#__next {
    height: 100%;
  }

  * {
    scrollbar-width: none;
  }

  *::-webkit-scrollbar { 
    display: none;
  }

  h1 {
    font-size: var(--font-h1);
    font-weight: 500;
  }

  strong {
    font-weight: 700;
    color: var(--color-primary);
  }

  h2 {
    font-size: var(--font-h2);
  }

  h3 {
    font-size: var(--font-h3);
  }

  h1, h3, h4 {
    font-weight: 500;
  }

  p::first-letter, h2::first-letter, h3::first-letter, h4::first-letter {
    text-transform: uppercase;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const GlobalStylesWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyle />
    {children}
  </>
);

export default GlobalStylesWrapper;

