import React, { useState, useContext, useEffect } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const { doctor, fetchReviews } = useGlobalContext();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        description: '',
        rating: '',
        doctor_id: doctor.doctor_id
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Controllo per campi vuoti
        if (!formData.first_name || !formData.last_name || !formData.description || !formData.rating) {
            alert('Per favore compila tutti i campi richiesti!');
            return;
        }
        if (
            formData.first_name.length < 3 ||
            formData.last_name.length < 3 ||
            !/^[A-Z]/.test(formData.first_name) ||
            !/^[A-Z]/.test(formData.last_name)
        ) {
            alert('Il nome e il cognome devono avere almeno 3 caratteri e la prima lettera deve essere maiuscola!');
            return;
        }
        if (formData.rating < 1 || formData.rating > 5) {
            alert('Il voto deve essere compreso tra 1 e 5!');
            return
        }

        // Conversione del  rating in numero
        const formDataToSend = {
            ...formData,
            rating: Number(formData.rating),
        };

        // console.log('Dati inviati:', formDataToSend);

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataToSend),
        })
            .then((response) => {
                //console.log('Response status:', response.status);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then((data) => {
                //console.log('Risposta del server:', data);
                alert('Recensione inviata con successo!');
                fetchReviews();
                setTimeout(() => {
                    alert('Recensione aggiunta con successo, stai per essere renderizzato alla pagina iniziale...');
                    navigate('/');
                }, 3000);
            })
            .catch((error) => {
                console.error('Errore durante l\'invio della recensione:', error);
            });

        /* reset del form */
        setFormData({
            first_name: '',
            last_name: '',
            description: '',
            rating: '',
            doctor_id: doctor.doctor_id
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
                        placeholder='Il nome prevede almeno 3 caratteri di cui il primo maiuscolo'
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
                        placeholder='Il cognome prevede almeno 3 caratteri di cui il primo maiuscolo'
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
                        placeholder='Il voto prevede un valore compreso tra 1 e 5'
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
