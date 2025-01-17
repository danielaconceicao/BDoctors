import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

export default function ShowReviewsByDoctorId() {
    const { doctor, doctorReviews, setDoctorReviews, setAverageRating } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch delle recensioni per il dottore
    const fetchReviewByDoctorId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/reviews/${doctor.doctor_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDoctorReviews(data);
        } catch (err) {
            setDoctorReviews([]);
            setAverageRating("N/A");
        }
    };

    // Fetch del rating medio del dottore
    const fetchDoctorAverageRating = async () => {
        try {
            const response = await fetch(`http://localhost:3000/doctors/${doctor.doctor_id}/average-rating`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAverageRating(data.average_rating); // Aggiorna il rating medio nel contesto globale
        } catch (err) {
            setAverageRating("N/A");
        }
    };

    // Effettua entrambe le chiamate all'API quando il componente è montato o quando il dottore cambia
    useEffect(() => {
        if (doctor?.doctor_id) {
            fetchReviewByDoctorId();
            fetchDoctorAverageRating();
        }
    }, [doctor]);

    // Funzione per generare le stelle
    function starRating(rating) {
        if (rating) {
            const starArray = [];
            for (let i = 0; i < Math.round(rating); i++) {
                const star = <span key={i} className="bi bi-star-fill text-warning"></span>;
                starArray.push(star);
            }
            return starArray;
        }
        return null;
    }

    return (
        <div className="container-sm mt-4 mb-5 p-0">
            <h1 className="text-center mb-4">Recensioni</h1>
            {doctorReviews && doctorReviews.length > 0 ? (
                <ul className="list-group gap-3">
                    {doctorReviews.map((review) => {
                        const formattedDate = new Date(review.date).toLocaleDateString("it-IT");
                        return (
                            <li key={review.id} className="list-group-item border border-1 border-secondary rounded p-3">
                                <div className="d-flex justify-content-between">
                                    <h4 className="mb-0">
                                        <strong>
                                            {review.first_name} {review.last_name}
                                        </strong>
                                    </h4>
                                    <p className="mb-0"><strong>{formattedDate}</strong></p>
                                </div>
                                <div className="mt-4">
                                    <div className="mb-2">
                                        {starRating(review.rating)}
                                    </div>
                                    <hr />
                                    <p>{review.description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-center">Nessuna recensione disponibile per questo dottore.</p>
            )}
        </div>
    );
}
