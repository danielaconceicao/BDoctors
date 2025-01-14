import { useGlobalContext } from "../GlobalContext/GlobalContext";

export default function Home() {
    const { specializations, loading, error } = useGlobalContext();

    return (
        <div>
            <h1>Specializzazioni</h1>

            {loading && <p>Caricamento in corso...</p>}
            {error && <p>Errore: {error}</p>}

            {!loading && !error && specializations.length === 0 && (
                <p>Nessuna specializzazione disponibile.</p>
            )}

            {!loading && !error && specializations.length > 0 && (
                <div className="cards-container">
                    {specializations.map(specialization => (
                        <div className="card" key={specialization.id}>
                            <h3>{specialization.specialization_name}</h3>
                            <p>{specialization.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
