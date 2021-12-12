import { useState, createContext } from 'react';

export enum AsideView {
  List = 'SHOPPING_LIST',
  NewItem = 'NEW_ITEM',
  Item = 'ITEM',
  User = 'USER'
}

interface AsideContextInterface {
  asideView: AsideView;
  payload: string | null;
  changeView: (view: AsideView, payload?: string) => void;
  hideAsideView: () => void;
  showAsideView: boolean;
}

export const AsideContext = createContext<AsideContextInterface | null>(null);

const AsideViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [asideView, setAsideView] = useState<AsideView>(AsideView.List);
  const [showAsideView, setShowAsideView] = useState<boolean>(false);
  const [payload, setPayload] = useState<string | null>(null);

  const changeView = (view: AsideView, viewPayload?: string) => {
    if (viewPayload) {
      setPayload(viewPayload);
    }
    setAsideView(view);
    setShowAsideView(true);
  };

  const hideAsideView = () => {
    setShowAsideView(false);
  };

  return(
    <AsideContext.Provider value={{
      asideView, changeView, payload, hideAsideView, showAsideView
    }}>
      {children}
    </AsideContext.Provider>
  );
};

export default AsideViewProvider;