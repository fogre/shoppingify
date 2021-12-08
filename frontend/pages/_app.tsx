import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { withUrqlClient } from 'next-urql';

import { urqlClientOptions } from '@/graphql/urqlClient';
import NotificationProvider from '../context/NotificationContext';

import GlobalStylesWrapper from '@/components/GlobalStyles';
import { NotificationModal } from '@/components/Modals';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GlobalStylesWrapper>
      <Head>
        <title>Shoppingify</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NotificationProvider>
        {getLayout(<Component {...pageProps} />)}
        <NotificationModal />
      </NotificationProvider>
    </GlobalStylesWrapper>
  );
};


export default withUrqlClient(() => ({
  ...urqlClientOptions
}))(MyApp);
