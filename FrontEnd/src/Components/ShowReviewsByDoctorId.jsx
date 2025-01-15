import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

export default function ShowReviewsByDoctorId() {
    const { fetchReviewByDoctorId, doctor, doctorReviews } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //console.log(parseInt(doctor.doctor_id));

    useEffect(() => {

        fetchReviewByDoctorId(doctor.doctor_id);

    }, [doctor])


    //console.log(doctorReviews);


    if (loading) {
        return <p>Caricamento recensioni...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    return (
        <div className="container-sm mt-4">
            <h1 className="text-center mb-4">Recensioni</h1>
            {doctorReviews.length > 0 ? (
                <ul className="list-group gap-3">
                    {doctorReviews.map((review) => (
                        <li key={review.id} className="list-group-item border border-2 border-secondary rounded p-3">
                            <h4>
                                <strong className="text-decoration-underline">
                                    {review.first_name} {review.last_name}
                                </strong>
                            </h4>

                            <ul className="list-unstyled mt-2">
                                <li><strong>Descrizione:</strong> {review.description}</li>
                                <li><strong>Voto:</strong> {review.rating}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center">Nessuna recensione disponibile per questo dottore.</p>
            )}
        </div>


    );
}
