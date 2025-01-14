import { createContext, useContext, useState, useCallback } from "react";

const Context = createContext();

export function GlobalContext({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funzione fetchData avvolta in useCallback
    const fetchData = useCallback((endpoint) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000${endpoint}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const value = { data, loading, error, fetchData };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
