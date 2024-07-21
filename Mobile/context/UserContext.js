import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';

// Create a context with a default value
const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [coin, setCoin] = useState(0);
  const [token,setToken]=useState(null)

  return (
    <AppContext.Provider value={{ coin,setCoin,token,setToken }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using context
export const useAppContext = () => {
  return useContext(AppContext);
};
