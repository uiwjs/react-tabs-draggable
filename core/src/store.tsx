import React, { FC, createContext, PropsWithChildren, useContext, useReducer } from 'react';

export interface InitialState {
  activeKey?: string;
  onTabClick?: (id: string, evn: React.MouseEvent<HTMLDivElement>) => void;
  data?: Array<{
    id: string;
    text: React.ReactNode;
  }>;
}

export const initialState: InitialState = {
  activeKey: '',
  data: [],
};

export const reducer = (state: Partial<InitialState>, action: Partial<InitialState>) => {
  return {
    ...state,
    ...action,
  };
};

export interface CreateContext {
  state: Partial<InitialState>;
  dispatch?: React.Dispatch<InitialState>;
}

export const Context = createContext<CreateContext>({
  state: initialState,
  dispatch: () => null,
});

export const Provider: FC<PropsWithChildren<{ init: InitialState }>> = ({ children, init }) => {
  const [state, dispatch] = useReducer(reducer, init || initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export function useDataContext() {
  const { state, dispatch } = useContext(Context);
  return { ...state, state, dispatch };
}
