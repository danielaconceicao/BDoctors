import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const FeaturedDoctorsCards = () => {
    const { doctors, reviews, setDoctor } = useGlobalContext();
    const [topDoctors, setTopDoctors] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Calcola la media dei voti e seleziona i primi 5 dottori
    useEffect(() => {
        const calculateTopDoctors = () => {
            const doctorRatings = doctors.map((doctor) => {
                const doctorReviews = reviews.filter(
                    (review) => review.doctor_id === doctor.doctor_id
                );
                const averageRating =
                    doctorReviews.reduce((sum, review) => sum + review.rating, 0) /
                    (doctorReviews.length || 1); // Evita divisioni per 0
                return { ...doctor, averageRating };
            });

            const sortedDoctors = doctorRatings.sort((a, b) => b.averageRating - a.averageRating);
            setTopDoctors(sortedDoctors.slice(0, 5));
        };

        calculateTopDoctors();
    }, [doctors, reviews]);

    const handleDoctorClick = (doctor) => {
        setDoctor(doctor); // Aggiorna il contesto globale, se necessario

        // Crea il nome completo per la URL
        const fullName = `${doctor.first_name}${doctor.last_name}`
            .replace(/\s+/g, '') // Rimuove spazi
            .toLowerCase(); // Converte tutto in minuscolo

        // Naviga alla rotta corretta
        navigate(`/DoctorPage/${fullName}/${doctor.doctor_id}`);
    };


    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-lg-5 gap-2 gap-lg-3">
                {topDoctors.map((doctor) => (
                    <div
                        key={doctor.doctor_id}
                        className=" card col mb-5"
                        role="button"
                        onClick={() => handleDoctorClick(doctor)}
                    >
                        <h3>{doctor.first_name} {doctor.last_name}</h3>
                        <p>Media voti: {isNaN(doctor.averageRating) ? "N/A" : doctor.averageRating.toFixed(1)}</p>
                        <p>
                            Specializzazioni:{" "}
                            {doctor.specializations
                                .split(",")
                                .map((spec) => t(spec.trim()))
                                .join(", ")}
                        </p>
                        <p>Contatto: {doctor.phone_number}</p>
                        <p>Email: {doctor.email}</p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default FeaturedDoctorsCards;
