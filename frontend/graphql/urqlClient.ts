import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  errorExchange,
  fetchExchange
} from "urql";

import { getToken, isServerSide, removeToken } from '@/utils/tokenUtils';

const ssrCache = ssrExchange({ isClient: !isServerSide });

const urqlClientOptions = {
  url: "http://localhost:4000/",
  exchanges: [
    dedupExchange,
    cacheExchange,
    ssrCache,
    errorExchange({
      onError: error => {
        if (error.message?.includes('not authenticated')) {
          if (!isServerSide) {
            removeToken();
            location.replace('/login');
          }
        }
        console.log(error);
      }
    }),
    fetchExchange
  ],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  }
};

export { urqlClientOptions };
