import { isEqual } from 'lodash-es';
import { useReducer, type PropsWithChildren } from 'react';
import { UserActionContext, UserActionDispatchContext } from './context';
import type { UserAction } from './types';

export const UserActionContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, {
    type: 'NO_ACTION',
  });

  return (
    <UserActionContext.Provider value={state}>
      <UserActionDispatchContext.Provider value={dispatch}>
        {children}
      </UserActionDispatchContext.Provider>
    </UserActionContext.Provider>
  );
};

const reducer = (state: UserAction, action: UserAction): UserAction => isEqual(state, action) ? state : action;
