import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';

const AverageRating = ({ doctorId }) => {
    const { fetchReviewByDoctorId, doctorReviews, loading, error, averageRating, setAverageRating } = useGlobalContext();

    const [calculationError, setCalculationError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                //console.log(`Fetching reviews for doctor ID: ${doctorId}`);
                await fetchReviewByDoctorId(doctorId);
            } catch (err) {
                //console.error('Error fetching reviews:', err);
                setCalculationError('Failed to fetch reviews');
            }
        };

        if (doctorId) {
            fetchReviews();
        }
    }, [fetchReviewByDoctorId, doctorId]);

    useEffect(() => {
        const calculateAverageRating = () => {
            try {
                //console.log('Fetched reviews:', doctorReviews);

                if (doctorReviews.length > 0) {
                    const totalRating = doctorReviews.reduce((acc, review) => acc + review.rating, 0);
                    const avgRating = (totalRating / doctorReviews.length).toFixed(2);
                    //console.log('Total rating:', totalRating);
                    //console.log('Average rating:', avgRating);
                    setAverageRating(avgRating);
                } else {
                    //console.log('No reviews found for this doctor.');
                    setAverageRating(0);
                }
            } catch (err) {
                //console.error('Error calculating average rating:', err);
                setCalculationError('Failed to calculate average rating');
            }
        };

        if (doctorReviews.length > 0) {
            calculateAverageRating();
        }
    }, [doctorReviews]);

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (calculationError) {
        return <div>{calculationError}</div>;
    }

    return (
        <div className="d-flex container mt-4 mb-5">
            <div className="card p-2 text-white vote_button" style={{ width: "8rem", height: "2rem" }}>
                <h6 className="text-center" style={{ fontSize: "12px" }}>Voto Medio: {averageRating}</h6>
            </div>
        </div>


    );
};

export default AverageRating;
