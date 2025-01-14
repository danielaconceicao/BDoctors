import { useGlobalContext } from "../GlobalContext/GlobalContext";

export default function AdvancedSearchPage() {
    const { filteredDoctors, loading, error } = useGlobalContext();

    return (
        <>
            <h1>Medici Filtrati</h1>
            {loading && <p>Caricamento in corso...</p>}
            {error && <p>Errore: {error}</p>}
            {!loading && !error && (
                <ul>
                    {filteredDoctors.map((doctor) => (
                        <li key={doctor.doctor_id}>
                            <h3>{doctor.first_name} {doctor.last_name}</h3>
                            <p>Email: {doctor.email}</p>
                            <p>Telefono: {doctor.phone_number}</p>
                            <p>Indirizzo: {doctor.address}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
