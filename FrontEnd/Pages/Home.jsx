import { useEffect } from "react";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

export default function Home() {
    const { data: doctors, loading, error, fetchData } = useGlobalContext();

    useEffect(() => {
        fetchData("/doctors");
    }, [fetchData]);

    return (
        <>
            <h1>Lista dei Dottori</h1>
            {loading && <p>Caricamento in corso...</p>}
            {error && <p>Errore: {error}</p>}
            {!loading && !error && (
                <ul>
                    {doctors.map((doctor) => (
                        <li key={doctor.doctor_id}>
                            <h3>{doctor.first_name} {doctor.last_name}</h3>
                            <p>Email: {doctor.email}</p>
                            <p>Telefono: {doctor.phone_number}</p>
                            <p>Indirizzo: {doctor.address}</p>
                            <p>Specializzazioni: {doctor.specializations}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
