import { createContext, useContext, useReducer } from "react";

const appState = {
  state: {
    loginUser: {
      profile_image_url: "",
      name: "",
      updated_at: "",
    },
  },
  dispatch: (data: any) => {},
};

export const AppContext = createContext(appState);

function reducer(state: any, action: any) {
  if (action.type == "UpdateUser") {
    return {
      ...state,
      state: { name: action.name },
    };
  }
}
export function AppProvider({ children, loginUser }: any) {
  const [state, dispatch] = useReducer(reducer, {
    ...appState,
    state: { ...appState.state, loginUser },
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
