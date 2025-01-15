import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import styles from "../styles/FeaturedDoctorsCarousel.module.css";

const FeaturedDoctorsCarousel = () => {
    const { doctors, reviews, fetchReviewByDoctorId } = useGlobalContext();
    const [featuredDoctors, setFeaturedDoctors] = useState([]);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

    // Calcola la media delle recensioni per ogni dottore
    useEffect(() => {
        const calculateAverageRatings = async () => {
            const doctorRatings = await Promise.all(
                doctors.map(async (doctor) => {
                    const doctorReviews = reviews.filter((review) => review.doctor_id === doctor.doctor_id);
                    const averageRating =
                        doctorReviews.reduce((sum, review) => sum + review.rating, 0) /
                        (doctorReviews.length || 1); // Evita divisione per 0
                    return { ...doctor, averageRating };
                })
            );

            // Ordina i dottori in base alla media dei voti
            const sortedDoctors = doctorRatings.sort((a, b) => b.averageRating - a.averageRating);
            setFeaturedDoctors(sortedDoctors.slice(0, 5)); // Mostra solo i top 5
        };

        calculateAverageRatings();
    }, [doctors, reviews]);

    // Cambia automaticamente il dottore visualizzato ogni 6 secondi
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDoctorIndex((prevIndex) =>
                (prevIndex + 1) % featuredDoctors.length
            );
        }, 6000);

        return () => clearInterval(interval);
    }, [featuredDoctors]);

    // Funzioni per cambiare manualmente dottore
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

    if (featuredDoctors.length === 0) {
        return <p>Caricamento dottori in evidenza...</p>;
    }

    const currentDoctor = featuredDoctors[currentDoctorIndex];

    return (
        <div className={styles.carousel}>
            {/* Frecce visibili solo su desktop */}
            <button
                className={`${styles.arrow} ${styles.leftArrow}`}
                onClick={handlePrev}
            >
                &lt;
            </button>
            <div className={styles.card}>
                <h3>{currentDoctor.first_name} {currentDoctor.last_name}</h3>
                <p className="col-12">Media voti: {currentDoctor.averageRating.toFixed(1)}</p>
                <p className="col-12">Specializzazioni: {currentDoctor.specializations}</p>
                <p className="col-12">Contatto: {currentDoctor.phone_number}</p>
                <p className="col-12">Email: {currentDoctor.email}</p>
            </div>
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
