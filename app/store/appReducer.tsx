import { createContext, useContext, useEffect, useReducer } from "react";

const appState = {
  loginUser: {
    profile_image_url: "",
    first_name: "",
    last_name: "",
    updated_at: "",
  },
  dispatch: (data: any) => {},
};

export const AppContext = createContext(appState);

function reducer(state: any, action: any) {
  if (action.type == "UpdateUser") {
    return {
      ...state,
      loginUser: action.payload,
    };
  }
}
export function AppProvider({ children, loginUser }: any) {
  const [state, dispatch] = useReducer(reducer, appState);
  useEffect(() => {
    dispatch({ type: "UpdateUser", payload: loginUser });
  }, [loginUser]);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
