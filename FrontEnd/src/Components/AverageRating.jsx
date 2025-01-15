import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/GlobalContext";

export default function AverageRating({ doctorId }) {
    const { fetchReviewByDoctorId } = useGlobalContext();
    const [averageRating, setAverageRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const calculateAverageRating = async () => {
            setLoading(true);
            try {
                const reviews = await fetchReviewByDoctorId(doctorId);

                if (reviews && reviews.length > 0) {
                    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
                    const avg = totalRating / reviews.length;
                    setAverageRating(avg.toFixed(2));
                } else {
                    setAverageRating(0);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            calculateAverageRating();
        }
    }, [fetchReviewByDoctorId, doctorId]);

    if (loading) {
        return <p>Calcolo della media in corso...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    return (
        <div>
            <h2>Media dei Voti</h2>
            <p>{averageRating !== null ? averageRating : "N/A"}</p>
        </div>
    );
}
