import React, { createContext, useState } from 'react';

// Create a Context
const GlobalStateContext = createContext();

// Create a Provider component
const GlobalStateProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user_details, setUserDetails] = useState({
    });
    const [existing_cart, setExistingCart] = useState({
        '0': '0',
    });
    const [yesterday_cart, setYesterdaycart] = useState({
        '0': '0',
    });

    return (
        <GlobalStateContext.Provider value={{ isAuthenticated, setIsAuthenticated, user_details, setUserDetails, existing_cart, setExistingCart, yesterday_cart, setYesterdaycart }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export { GlobalStateContext, GlobalStateProvider };
