import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(function () {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== null) {
      setToken(storedToken);
    }
  }, []);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
