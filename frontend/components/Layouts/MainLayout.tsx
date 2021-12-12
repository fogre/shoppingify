import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';

import { QUERIES } from '@/constants';
import { getToken, isServerSide } from '@/utils/tokenUtils';
import AsideViewProvider, { AsideContext } from '../../context/AsideViewContext';
import ConfirmationProvider from '../../context/ConfirmationContext';
import UserProvider from '../../context/UserContext';

import Aside from '@/components/Aside';
import { ConfirmationModal } from '@/components/Modals';
import Navigation from '@/components/Navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  //If not logged in push to login page
  if (!getToken() && !isServerSide) {
    router.push('/login')
      .catch(e => console.log(e));
    return (
      <div suppressHydrationWarning></div>
    );
  }

  return (
    <Wrapper>
      <UserProvider>
        <AsideViewProvider>
          <ConfirmationProvider>
            <LayoutGrid>
              {children}
            </LayoutGrid>
            <ConfirmationModal />
          </ConfirmationProvider>  
        </AsideViewProvider>
      </UserProvider>
    </Wrapper>
  );
};

const LayoutGrid = ({ children }: { children: React.ReactNode }) => {
  const { showAsideView } = useContext(AsideContext);

  return (
    <GridWrapper>
      <NavGridWrapper>
        <Navigation />
      </NavGridWrapper>
      <MainGridWrapper>
        {children}
      </MainGridWrapper>
      <AsideGridWrapper show={showAsideView}>
        <Aside />
      </AsideGridWrapper>
    </GridWrapper>
  );
};

export const getMainLayout = (page: ReactElement) => (
  <MainLayout>
    {page}
  </MainLayout>
);

const Wrapper = styled.div`
  --padding-top: 35px;
  --padding-main: 40px;
  height: 100%;

  @media ${QUERIES.tablet} {
    --padding-top: 25px;
    --padding-main: 25px;
  }

  @media ${QUERIES.mobile} {
    --padding-main: 12px;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 390px;
  grid-template-area: 
    'nav' 'main' 'aside';
  height: 100%;
  position: relative;

  @media ${QUERIES.tablet} {
    grid-template-columns: 70px 1fr 320px;
  }

  @media ${QUERIES.mobile} {
    --aside-width: calc(100vw - 60px);
    grid-template-columns: 60px 1fr;
    overflow: hidden;
  }
`;

const NavGridWrapper = styled.nav`
  --padding-nav: 12px;
  grid-area: 'nav';
  padding: var(--padding-top) var(--padding-nav);
  height: 100%;
`;

const MainGridWrapper = styled.main`
  grid-area: 'main';
  background-color: hsl(238, 12%, 98%);
  padding: var(--padding-top) var(--padding-main);
  overflow: auto;
  position: relative;
  max-height: 100%;
`;

const AsideGridWrapper = styled('aside')<{ show: boolean }>`
  grid-area: 'aside';
  position: sticky;
  top: 0;
  right: 0;
  max-height: 100vh;

  @media ${QUERIES.mobile} {
    --aside-position: calc(var(--aside-width) * -1);
    position: absolute;
    height: 100%;
    max-height: 100vh;
    width: var(--aside-width);
    right: var(--aside-position);
    transform: ${p => p.show
      ? 'translateX(var(--aside-position))'
      : ''
    };
  }
`;