import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

export default function ShowReviewsByDoctorId({ doctorId }) {
    const { fetchReviewByDoctorId } = useGlobalContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchReviewByDoctorId(doctorId);
                setReviews(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchReviews();
        }
    }, [doctorId, fetchReviewByDoctorId]);

    if (loading) {
        return <p>Caricamento recensioni...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    return (
        <div>
            <h1>Recensioni</h1>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <strong>
                                {review.first_name} {review.last_name}
                            </strong>
                            <ul>
                                <li>Descrizione: {review.description}</li>
                                <li>Rating: {review.rating}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna recensione disponibile per questo dottore.</p>
            )}
        </div>
    );
}
