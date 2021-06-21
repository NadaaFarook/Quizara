import React, { createContext, FC, useContext, useState } from "react";
import { Token } from "../types/Quiz.types";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<boolean>> | any;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthContextProvider: FC = ({ children }): JSX.Element => {

  const TokeninLocalStorage = localStorage.getItem('token')
  const [token, setToken] = useState<Token>(TokeninLocalStorage);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook for context call
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
