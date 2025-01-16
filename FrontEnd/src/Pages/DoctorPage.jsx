import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddReview from "../Components/AddReview";
import ShowReviewsByDoctorId from "../Components/ShowReviewsByDoctorId";
import AverageRating from "../Components/AverageRating";
import "../i118";

export default function DoctorPage() {
    const { doctor_id } = useParams();
    const navigate = useNavigate();
    console.log(doctor_id);

    const { doctors, setDoctors } = useState(null);
    const { t } = useTranslation();
    //console.log(doctors);

    async function getDoctor() {
        try {
            const response = await fetch(`http://localhost:3000/doctors/${doctorId}`);
            const data = await response.json()
            console.log(data);

        } catch (error) {
            console.error("Errore nel recupero dei dati", error)
        }
    }

    useEffect(() => {
        getDoctor();
    }, [])



    return (
        <>
            {/* <section className="doctor-page d-flex justify-content-center align-items-center min-vh-100">
            <div className="container-sm">
                <h1 className="text-center mb-4">Dottore</h1>
                <div className="container d-flex justify-content-center mt-4">
                    <div className="card border border-2 border-secondary rounded p-3" style={{ maxWidth: "28rem", width: "100%" }}>
                        <div className="card-body">
                            <h4 className="card-title text-center">
                                <strong className="text-decoration-underline">
                                    {doctor.first_name} {doctor.last_name}
                                </strong>
                            </h4>
                            <ul className="list-unstyled">
                                <li><strong>Email:</strong> {doctor.email}</li>
                                <li><strong>Telefono:</strong> {doctor.phone_number}</li>
                                <li><strong>Indirizzo:</strong> {doctor.address}</li>
                                <li>
                                    <strong>{t('Specializzazioni')}:</strong>
                                    <ul>
                                        {doctor.specializations.split(',').map((spec, index) => (
                                            <li key={index}>
                                                {t(spec.trim()) || spec.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <AddReview />
                <ShowReviewsByDoctorId doctorId={doctorId} />
                <AverageRating doctorId={doctorId} />
            </div>
        </section> */}
        </>
    );
}
