import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

export default function ShowReviewsByDoctorId() {
    const { doctor, doctorReviews, setDoctorReviews, setAverageRating } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReviewByDoctorId = async () => {

        try {
            const response = await fetch(`http://localhost:3000/reviews/${doctor.doctor_id}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log(data)

            setDoctorReviews(data)

        } catch (err) {
            console.error(`Error fetching reviews for doctor ID ${doctor.doctor_id}:`, err);
            setDoctorReviews([])
            setAverageRating('N/A');

        }
    };

    useEffect(() => {

        fetchReviewByDoctorId();


    }, [doctor]);


    //console.log(doctorReviews);


    // if (loading) {
    //     return <p>Caricamento recensioni...</p>;
    // }

    // if (error) {
    //     return <p>Errore: {error}</p>;
    // }

    return (
        <div className="container-sm mt-4">
            <h1 className="text-center mb-4">Recensioni</h1>
            {doctorReviews && doctorReviews.length > 0 ? (
                <ul className="list-group gap-3">
                    {doctorReviews.map((review) => {
                        const formattedDate = new Date(review.date).toLocaleDateString('it-IT'); // data formattata in italiano
                        return (
                            <li key={review.id} className="list-group-item border border-2 border-secondary rounded p-3">
                                <h4>
                                    <strong className="text-decoration-underline">
                                        {review.first_name} {review.last_name}
                                    </strong>
                                </h4>

                                <ul className="list-unstyled mt-2">
                                    <li><strong>Descrizione:</strong> {review.description}</li>
                                    <li><strong>Voto:</strong> {review.rating}</li>
                                    <li><strong>Data:</strong> {formattedDate}</li>
                                </ul>
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
