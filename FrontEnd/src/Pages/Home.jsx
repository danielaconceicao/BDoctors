import { useGlobalContext } from "../Context/GlobalContext";
import { useTranslation } from "react-i18next";
import "../i118";
import { useNavigate, NavLink } from "react-router-dom";
import FeaturedDoctorsCards from "../Components/FeaturedDoctorsCards";

export default function Home() {
    const { specializations, loading, error } = useGlobalContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleCardClick = (specializationName) => {
        // Naviga alla pagina AdvancedSearchPage con la specializzazione nella rotta
        navigate(`/AdvancedSearchPage/${specializationName}`);
    };

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <h1>Specializzazioni</h1>
                    <NavLink to="/DoctorRegistration" className="register_btn d-none d-md-block">
                        SEI UN DOTTORE? REGISTRATI QUI
                    </NavLink>
                    <NavLink to="/DoctorRegistration" className="register_btn d-md-none">
                        <i className="bi bi-plus-circle"></i>
                    </NavLink>
                </div>
                <div className="row">
                    {loading && <p>Caricamento in corso...</p>}
                    {error && <p>Errore: {error}</p>}

                    {!loading && !error && specializations.length === 0 && (
                        <p>Nessuna specializzazione disponibile.</p>
                    )}

                    {!loading && !error && specializations.length > 0 && (
                        <div className="cards-container">
                            {specializations.map((specialization) => (
                                <div
                                    className="card_custom"
                                    key={specialization.id}
                                    onClick={() => handleCardClick(specialization.specialization_name)}
                                >
                                    <h3>{t(specialization.specialization_name)}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <h2 className="mt-3 mb-3">I Nostri 5 Dottori in Evidenza</h2>
                <FeaturedDoctorsCards />
            </div>
        </div>
    );
}
