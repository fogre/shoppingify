export const COLORS = {
  black: 'hsl(0, 0%, 0%)',
  danger: 'hsl(0, 79%, 63%)',
  grey: {
    27: 'hsl(0, 0%, 27%)',
    51: 'hsl(0, 0%, 51%)',
    74: 'hsl(0, 0%, 74%)',
    95: 'hsl(0, 0%, 95%)',
    240: 'hsl(240, 2%, 76%)'
  },
  orangeLight: 'hsl(33, 100%, 94%)',
  primary: 'hsl(38, 95%, 51%)',
  secondary: 'hsl(195, 86%, 64%)',
  white: 'hsl(0,0,100%)',
  wine: 'hsl(340, 28%, 39%)'
};

export const BREAKPOINTS = {
  mobileMin: 800,
  tabletMin: 1099,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobileMin / 16}rem)`,
  tablet: `(max-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
  tabletOnly: `
    (min-width: ${BREAKPOINTS.tabletMin / 16}rem) and
    (max-width: ${(BREAKPOINTS.laptopMin - 1) / 16}rem)`,
};