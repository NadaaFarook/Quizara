// import React, { createContext,  useContext,  useReducer } from "react";
// import AxiosCall from "../services/api-calls";

// const ApiContext = createContext()

// export default function ApiCallsContextProvider({ children }) {
//   const [state, dispatch] = useReducer(AxiosCall, {});
//   return (
//     <ApiContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ApiContext.Provider>
//   );
// }
// const useAxiosCall = () => {    return useContext(ApiContext);
//   };
  
//   export { useAxiosCall}