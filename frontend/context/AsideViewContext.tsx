import { useState, createContext } from 'react';

export enum AsideView {
  List = 'SHOPPING_LIST',
  NewItem = 'NEW_ITEM',
  Item = 'ITEM',
}

interface Payload {
  payload: string | ID | null;
}

interface AsideContextInterface {
  asideView: AsideView;
  payload: Payload;
  changeView: (view: AsideView, payload: Payload) => void;
  hideAsideView: () => void;
  showAsideView: boolean;
}

export const AsideContext = createContext<AsideContextInterface>();

const AsideViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [asideView, setAsideView] = useState<AsideView>('SHOPPING_LIST');
  const [showAsideView, setShowAsideView] = useState<boolean>(false);
  const [payload, setPayload] = useState<Payload | null>();

  const changeView = (view: AsideView, viewPayload: Payload = null) => {
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