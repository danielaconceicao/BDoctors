import React, { useState, useContext, useEffect } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';

const AddReview = () => {
    const { doctor } = useGlobalContext();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        description: '',
        rating: '',
        doctor_id: doctor ? doctor.doctor_id : null,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Controllo per campi vuoti
        if (!formData.first_name || !formData.last_name || !formData.description || !formData.rating) {
            alert('Per favore compila tutti i campi richiesti!');
            return;
        }

        // Converti rating in numero
        const formDataToSend = {
            ...formData,
            rating: Number(formData.rating),
        };

        console.log('Dati inviati:', formDataToSend);

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSend),
        })
            .then((response) => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Risposta del server:', data);
                alert('Recensione inviata con successo!');
                // Aggiorna le recensioni nel contesto globale
                addReview(data);
            })
            .catch((error) => {
                console.error('Errore durante l\'invio della recensione:', error);
                alert('Si è verificato un errore durante l\'invio della recensione. Riprova più tardi.');
            });
    };

    return (
        <div className="container border border-2 border-secondary rounded p-4 mt-4">
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
                <div className="form-group mb-4">
                    <label htmlFor="doctor_id">Dottore:</label>
                    <select
                        name="doctor_id"
                        id="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Seleziona il Dottore</option>
                        <option key={doctor.id} value={doctor.doctor_id}>
                            {doctor.first_name} {doctor.last_name}
                        </option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Invia Recensione</button>
            </form>
        </div>

    );
};

export default AddReview;
