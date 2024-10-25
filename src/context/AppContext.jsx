/* eslint-disable react/prop-types */
import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currencySymbol = 'Rs.'

    const value = {
        doctors,
        currencySymbol
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;