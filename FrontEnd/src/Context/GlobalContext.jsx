import { createContext, useContext, useState, useCallback, useEffect } from "react";

const Context = createContext();

export function GlobalContext({ children }) {
    const [specializations, setSpecializations] = useState([]); // Specializzazioni
    const [doctors, setDoctors] = useState([]); // Tutti i dottori
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Medici filtrati
    const [reviews, setReviews] = useState([]); // Recensioni
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [doctor, setDoctor] = useState(null)
    const [doctorReviews, setDoctorReviews] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [averageRating, setAverageRating] = useState(0);



    // console.log(doctors);
    // console.log(specializations);
    // console.log(filteredDoctors);
    // console.log(reviews);




    // Funzione generica per le chiamate API
    const fetchData = async (endpoint) => {
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
    }

    // Funzione per recuperare tutti i dottori
    const fetchDoctors = async () => {
        try {
            const data = await fetchData("/doctors");
            setDoctors(data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
    }

    // Funzione per recuperare tutte le specializzazioni
    const fetchSpecializations = async () => {
        try {
            const data = await fetchData("/specializations");
            setSpecializations(data);
        } catch (err) {
            console.error("Error fetching specializations:", err);
        }
    }

    // Funzione per recuperare tutte le recensioni
    const fetchReviews = async () => {
        try {
            const data = await fetchData(`/reviews`);
            setReviews(data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    }

    // Aggiungi una funzione per recuperare la media dei voti di un dottore
    const fetchAverageRating = async (doctorId) => {
        try {
            const data = await fetchData(`/doctors/${doctorId}/average-rating`);
            setAverageRating(data.average_rating);  // Imposta la media dei voti
        } catch (err) {
            console.error(`Error fetching average rating for doctor ID ${doctorId}:`, err);
        }
    }

    // Funzione per recuperare recensioni per ID del dottore
    // const fetchReviewByDoctorId = async (doctorId) => {
    //     try {
    //         const data = await fetchData(`/reviews/${doctorId}`);
    //         setDoctorReviews(data); // Restituisce i dati al chiamante
    //     } catch (err) {
    //         console.error(`Error fetching reviews for doctor ID ${doctorId}:`, err);
    //         return; // Restituisce null in caso di errore
    //     }
    // }



    // Effettua il fetch iniziale
    useEffect(() => {
        fetchDoctors();
        fetchSpecializations();
        fetchReviews();
    }, []);


    // Valore fornito al contesto
    const values = {
        loading,
        error,
        doctors,
        specializations,
        filteredDoctors,
        reviews,
        doctor,
        setFilteredDoctors,
        fetchDoctors,
        fetchSpecializations,
        fetchReviews,
        setDoctor,
        doctorReviews,
        selectedSpecialization,
        setSelectedSpecialization,
        setDoctorReviews,
        setAverageRating,
        averageRating,
        fetchAverageRating
    };

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
}

export const useGlobalContext = () => useContext(Context);
