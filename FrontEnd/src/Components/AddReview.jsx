import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const { doctor, fetchReviews } = useGlobalContext();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        description: '',
        rating: '',
    });

    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (doctor) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                doctor_id: doctor.doctor_id,
            }));
        }
    }, [doctor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validazione campi
        if (!formData.first_name || !formData.last_name || !formData.description || !formData.rating) {
            showAlert('Per favore compila tutti i campi richiesti!', 'danger');
            return;
        }
        if (
            formData.first_name.length < 3 ||
            formData.last_name.length < 3 ||
            !/^[A-Z]/.test(formData.first_name) ||
            !/^[A-Z]/.test(formData.last_name)
        ) {
            showAlert('Il nome e il cognome devono avere almeno 3 caratteri e la prima lettera deve essere maiuscola!', 'danger');
            return;
        }
        if (formData.rating < 1 || formData.rating > 5) {
            showAlert('Il voto deve essere compreso tra 1 e 5!', 'danger');
            return;
        }

        const formDataToSend = {
            ...formData,
            rating: Number(formData.rating),
        };

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => { throw new Error(text); });
                }
                return response.json();
            })
            .then((data) => {
                fetchReviews();
                showAlert('Recensione inviata con successo!', 'success');
            })
            .catch((error) => {
                showAlert(`Errore durante l'invio della recensione: ${error.message}`, 'danger');
            });

        setFormData({
            first_name: '',
            last_name: '',
            description: '',
            rating: '',
            doctor_id: doctor.doctor_id || '',
        });
        location.reload();
    };

    return (
        <div className="container border border-2 border-secondary rounded p-4 mt-4 ">
            <h2 className="mt-3 mb-4 text-center">Lascia una recensione</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className="form-group">
                    <label htmlFor="first_name">Nome:</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Il nome prevede almeno 3 caratteri di cui il primo maiuscolo"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Cognome:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Il cognome prevede almeno 3 caratteri di cui il primo maiuscolo"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrizione:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Voto (1-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="form-control"
                        min="1"
                        max="5"
                        required
                    />
                </div>

                {/* Bootstrap Alert */}
                {alert.show && (
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.message}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setAlert({ show: false, message: '', type: '' })}
                        ></button>
                    </div>
                )}

                <button type="submit" className="btn btn-primary mt-3 ">Invia Recensione</button>
            </form>
        </div>
    );
};

export default AddReview;
