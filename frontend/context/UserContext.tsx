import { useState, useEffect, createContext, useContext } from 'react';
import { useQuery } from 'urql';

import { ShoppingList, Statistics, UserDocument } from '@/graphql/generated';
import { NotificationContext } from '@/context';

import ShoppingListProvider from './ShoppingListContext';

interface ParsedHistory {
  [key: string]: Array<ShoppingList>;
}

interface UserContextIF {
	history: ParsedHistory,
	statistics: Statistics
}

//sorts the history by months and parses Dates to correct form
const parseHistoryByMonths = (historyArray: ShoppingList[]): ParsedHistory => {
  const sorted: ParsedHistory = {};

  for (const history of historyArray) {
    const date = new Date(history.date);
    const nameDateString: string = date.toLocaleString('default', {
      year: 'numeric', month: 'long'
    });
    const historyDateString: string = date.toLocaleString('default', {
      weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'
    });

    if (!sorted[nameDateString]) {
      sorted[nameDateString] = [];
    }
    sorted[nameDateString].push({
      ...history,
      date: historyDateString
    });
  }

  return sorted;
};

export const UserContext = createContext<UserContextIF | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { showNotification } = useContext(NotificationContext);
	const [history, setHistory] = useState<ParsedHistory>({});
	const [statistics, setStatistics] = useState<Statistics | null>();
	const [result] = useQuery({
		query: UserDocument
	});

	useEffect(() => {
		if (result.data?.user) {
			const user = result.data.user;
			setHistory(parseHistoryByMonths(user.history));
			setStatistics(user.statistics);
		}

		if (result.error) {
      showNotification({
        type: 'error',
        message: result.error.message
      });
		}
	}, [result]);

	return(
		<UserContext.Provider value={{
			history,
			statistics
		}}>
			<ShoppingListProvider>
				{children}
			</ShoppingListProvider>	
		</UserContext.Provider>
	);
};

export default UserProvider;