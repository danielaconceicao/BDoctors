import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";
import starRating from "../utils/helper.jsx";

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

    useEffect(() => {
        if (doctor?.doctor_id) {
            fetchReviewByDoctorId();
            fetchDoctorAverageRating();
        }
    }, [doctor]);


    // Ordina le recensioni dalla più recente alla meno recente
    const sortedReviews = [...doctorReviews].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="container-sm mt-4 mb-5 p-0 ">
            <h1 className="text-center mb-4 fw-bold">Recensioni</h1>
            {sortedReviews && sortedReviews.length > 0 ? (
                <ul className="list-group gap-3 ">
                    {sortedReviews.map((review) => {
                        const formattedDate = new Date(review.date).toLocaleDateString("it-IT");
                        return (
                            <li key={review.id} className="list-group-item border border-1 border-secondary rounded p-3 shadow-lg show_reviews">
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
                                    <p className="review-description">{review.description}</p>
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
