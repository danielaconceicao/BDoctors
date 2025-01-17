import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddReview from "../Components/AddReview";
import ShowReviewsByDoctorId from "../Components/ShowReviewsByDoctorId";
import "../i118";
import { useGlobalContext } from "../Context/GlobalContext";

export default function DoctorPage() {
    const { doctor_id } = useParams();
    const [doctors, setDoctors] = useState(null);
    const [doctorid, setDoctorid] = useState(null);
    const [rating, setRating] = useState(null); // Stato per il rating del dottore corrente
    const { t } = useTranslation();
    const { setDoctor } = useGlobalContext();

    // Recupera la lista di dottori
    async function getsDoctor() {
        try {
            const response = await fetch(`http://localhost:3000/doctors`);
            const data = await response.json();
            setDoctors(data);
            console.log(data);

        } catch (error) {
            console.error("Errore nel recupero dei dati", error);
        }
    }

    // Recupera il rating di un dottore
    async function getDoctorRating(id) {
        try {
            const response = await fetch(`http://localhost:3000/doctors/${id}/average-rating`);
            const data = await response.json();
            //console.log(data);
            setRating(data.average_rating);
        } catch (error) {
            console.error("Errore nel recupero del rating", error);
        }
    }

    // Recupera i dottori al montaggio del componente
    useEffect(() => {
        getsDoctor();
    }, []);

    // Trova il dottore corrente e aggiorna lo stato
    useEffect(() => {
        if (Array.isArray(doctors)) {
            const doctor = doctors.find(doc => parseInt(doc.doctor_id) === parseInt(doctor_id));
            setDoctorid(doctor);
            setDoctor(doctor); // Aggiorna il contesto globale
        }
    }, [doctors, doctor_id]);

    // Recupera il rating del dottore corrente
    useEffect(() => {
        if (doctorid) {
            getDoctorRating(doctorid.doctor_id);
        }
    }, [doctorid]);

    return (
        <section className="doctor-page d-flex justify-content-center align-items-center min-vh-100">
            <div className="container-sm">
                <h1 className="text-center mb-4">Dottore</h1>
                <div className="container d-flex justify-content-center mt-4">
                    <div className="card border border-2 border-secondary rounded p-3" style={{ maxWidth: "28rem", width: "100%" }}>
                        <div className="card-body">
                            <h4 className="card-title text-center">
                                <strong className="text-decoration-underline">
                                    {doctorid?.first_name} {doctorid?.last_name}
                                </strong>
                            </h4>
                            <ul className="list-unstyled">
                                <li><strong>Email:</strong> {doctorid?.email}</li>
                                <li><strong>Telefono:</strong> {doctorid?.phone_number}</li>
                                <li><strong>Indirizzo:</strong> {doctorid?.address}</li>
                                <li className="d-flex align-items-center">
                                    <p className="mb-0 me-2">
                                        <strong>Media Voti:</strong>
                                    </p>
                                    {[...Array(5)].map((_, index) => (
                                        <span key={index} style={{ color: '#f39c12', fontSize: '20px' }}>
                                            {index < rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                    {rating === null && <span>No rating</span>}
                                </li>

                                <li>
                                    <strong>{t('Specializzazioni')}:</strong>
                                    <ul>
                                        {doctorid?.specializations.split(',').map((spec, index) => (
                                            <li key={index}>
                                                {t(spec.trim()) || spec.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    {doctorid?.curriculum ? (
                                        <a
                                            href={doctorid.curriculum}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-primary mt-2"
                                        >
                                            Visualizza CV del dottore
                                        </a>
                                    ) : (
                                        <p className="text-center text-muted mt-2">Nessun Curriculum disponibile per questo dottore</p>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <AddReview />
                <ShowReviewsByDoctorId doctorId={doctor_id} />
            </div>
        </section>
    );
}
