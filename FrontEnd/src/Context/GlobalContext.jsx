import { createContext, useContext, useState, useCallback, useEffect } from "react";

const Context = createContext();

export function GlobalContext({ children }) {
    const [specializations, setSpecializations] = useState([]); // Specializzazioni
    const [doctors, setDoctors] = useState([]); // Tutti i dottori
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Medici filtrati
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState(null)

    // console.log(doctors);
    // console.log(specializations);
    // console.log(filteredDoctors);




    // Funzione generica per le chiamate API
    const fetchData = useCallback(async (endpoint) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err; // Rilancia l'errore per consentire una gestione aggiuntiva
        } finally {
            setLoading(false);
        }
    }, []);

    // Funzione per recuperare tutti i dottori
    const fetchDoctors = useCallback(async () => {
        try {
            const data = await fetchData("/doctors");
            setDoctors(data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
    }, [fetchData]);

    // Funzione per recuperare tutte le specializzazioni
    const fetchSpecializations = useCallback(async () => {
        try {
            const data = await fetchData("/specializations");
            setSpecializations(data);
        } catch (err) {
            console.error("Error fetching specializations:", err);
        }
    }, [fetchData]);

    // Effettua il fetch iniziale
    useEffect(() => {
        fetchDoctors();
        fetchSpecializations();
    }, [fetchDoctors, fetchSpecializations]);

    // Valore fornito al contesto
    const value = {
        doctors,
        specializations,
        filteredDoctors,
        setFilteredDoctors,
        loading,
        error,
        fetchDoctors,
        fetchSpecializations,
        setDoctor
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
