import { createContext, useContext, useEffect } from "react";

const Context = createContext();

export function GlobalContext({ children }) {
    const value = {}
    return (
        <Context.Provider
            value={value}
        > {children}
        </Context.Provider>
    )

}

export const useGlobalContext = () => useContext(Context);
