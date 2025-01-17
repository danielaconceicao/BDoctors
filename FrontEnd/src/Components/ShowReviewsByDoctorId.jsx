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

    return (
        <div className="container-sm mt-4 mb-5">
            <h1 className="text-center mb-4">Recensioni</h1>
            {doctorReviews && doctorReviews.length > 0 ? (
                <ul className="list-group gap-3">
                    {doctorReviews.map((review) => {
                        const formattedDate = new Date(review.date).toLocaleDateString("it-IT"); // Data formattata in italiano
                        return (
                            <li key={review.id} className="list-group-item border border-2 border-secondary rounded p-3">
                                <h4>
                                    <strong className="text-decoration-underline">
                                        {review.first_name} {review.last_name}
                                    </strong>
                                </h4>
                                <ul className="list-unstyled mt-2">
                                    <li><strong>Descrizione:</strong> {review.description}</li>
                                    <li className="d-flex align-items-center">
                                        <p className="mb-0 me-2">
                                            <strong>Voto:</strong>
                                        </p>
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} style={{ color: "#f39c12", fontSize: "20px" }}>
                                                {index < review.rating ? "★" : "☆"}
                                            </span>
                                        ))}
                                    </li>
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
