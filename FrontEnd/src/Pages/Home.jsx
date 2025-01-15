import { useGlobalContext } from "../Context/GlobalContext";
import { useTranslation } from "react-i18next";
import "../i118";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Home() {
    const { specializations, doctors, setFilteredDoctors, loading, error } = useGlobalContext();
    const { t } = useTranslation();
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const navigate = useNavigate();


    const handleCardClick = (e) => {
        const specializationName = e.currentTarget.getAttribute('data-specialization-name');
        setSelectedSpecialization(specializationName);

        // Filtra i dottori in base alla specializzazione selezionata
        const filtered = doctors.filter(doctor => {
            return doctor.specializations.split(',').includes(specializationName);
        });

        setFilteredDoctors(filtered); // Aggiorna lo stato con i dottori filtrati
        // console.log('Dottori filtrati:', filtered);
        navigate('/AdvancedSearchPage'); // Naviga alla pagina dei dottori filtrati
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>Specializzazioni</h1>
                <NavLink to="/DoctorRegistration" className="register_btn">SEI UN DOTTORE? REGISTRATI QUI</NavLink>

            </div>
            <div className="container">
                <div className="row">
                    {loading && <p>Caricamento in corso...</p>}
                    {error && <p>Errore: {error}</p>}

                    {!loading && !error && specializations.length === 0 && (
                        <p>Nessuna specializzazione disponibile.</p>
                    )}

                    {!loading && !error && specializations.length > 0 && (
                        <div className="cards-container">
                            {specializations.map(specialization => (
                                <div
                                    className="card"
                                    key={specialization.id}
                                    data-specialization-name={specialization.specialization_name}
                                    onClick={handleCardClick} // Aggiunto evento click
                                >
                                    <h3>{t(specialization.specialization_name)}</h3>
                                    {/* <p>{specialization.description}</p> */}
                                </div>
                            ))}
                        </div>
                    )}


                </div>
            </div>


        </div>
    );
}
