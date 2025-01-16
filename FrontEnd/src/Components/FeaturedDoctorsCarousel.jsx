import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import styles from "../styles/FeaturedDoctorsCarousel.module.css";
import "../i118";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FeaturedDoctorsCarousel = () => {
    const { doctors, setDoctor, reviews } = useGlobalContext();
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();



    // Calcola la media delle recensioni e ordina i dottori
    useEffect(() => {
        const calculateAverageRatings = () => {
            const doctorRatings = doctors.map((doctor) => {
                const doctorReviews = reviews.filter(
                    (review) => review.doctor_id === doctor.doctor_id
                );
                const averageRating =
                    doctorReviews.reduce((sum, review) => sum + review.rating, 0) /
                    (doctorReviews.length || 1); // Evita divisione per 0
                return { ...doctor, averageRating };
            });

            // Ordina i dottori per rating e mostra i top 5
            const sortedDoctors = doctorRatings.sort((a, b) => b.averageRating - a.averageRating);
            setFeaturedDoctors(sortedDoctors.slice(0, 5));
        };

        calculateAverageRatings();
    }, [doctors, reviews]);

    // Cambia automaticamente il dottore visualizzato ogni 6 secondi
    useEffect(() => {
        if (!isPaused && doctors.length > 1) {
            const interval = setInterval(() => {
                setCurrentDoctorIndex((prevIndex) =>
                    (prevIndex + 1) % doctors.length
                );
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isPaused, doctors.length]);


    // Gestisce il click su un dottore e naviga ai suoi dettagli
    const handleDoctorClick = (doctor) => {
        setDoctor(doctor); // Salva il dottore selezionato nel contesto
        navigate("/DoctorPage"); // Naviga alla pagina del dottore
    };

    // Cambia manualmente dottore
    const handleNext = () => {
        setCurrentDoctorIndex((prevIndex) =>
            (prevIndex + 1) % featuredDoctors.length
        );
    };

    const handlePrev = () => {
        setCurrentDoctorIndex((prevIndex) =>
            (prevIndex - 1 + featuredDoctors.length) % featuredDoctors.length
        );
    };

    if (doctors.length === 0) return null; // Nessun dottore, nessun carosello

    const currentDoctor = doctors[currentDoctorIndex];

    return (
        <div
            className={styles.carousel}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Frecce di navigazione */}
            <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={handlePrev}
            >
                &lt;
            </button>

            {/* Card del dottore attuale */}
            <div
                className={styles.card}
                onClick={() => handleDoctorClick(currentDoctor)}
            >
                <h3>{currentDoctor.first_name} {currentDoctor.last_name}</h3>
                <p>Media voti: {isNaN(currentDoctor.averageRating) ? "N/A" : currentDoctor.averageRating.toFixed(1)}</p>
                <p>
                    Specializzazioni:{" "}
                    {currentDoctor.specializations
                        .split(",")
                        .map((spec) => t(spec.trim()))
                        .join(", ")}
                </p>
                <p>Contatto: {currentDoctor.phone_number}</p>
                <p>Email: {currentDoctor.email}</p>
            </div>

            {/* Freccia destra */}
            <button
                className={`${styles.arrow} ${styles.rightArrow}`}
                onClick={handleNext}
            >
                &gt;
            </button>
        </div>
    );
};

export default FeaturedDoctorsCarousel;
