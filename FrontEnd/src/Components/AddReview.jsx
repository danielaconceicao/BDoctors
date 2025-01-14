import React, { useState } from 'react';
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const AddReview = () => {

    const { doctors } = useGlobalContext();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        description: '',
        rating: '',
        doctor_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.description || !formData.rating || !formData.doctor_id) {
            alert('Per favore compila tutti i campi richiesti!');
            return;
        }

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Risposta di rete non valida');
                }
                return response.json();
            })
            .then(() => {
                alert('Recensione aggiunta con successo!');
                setFormData({ first_name: '', last_name: '', description: '', rating: '', doctor_id: '' });
            })
            .catch((error) => {
                console.error('Errore durante l\'aggiunta della recensione:', error);
                alert('Si è verificato un errore durante l\'aggiunta della recensione. Riprova.');
            });
    };

    return (
        <div>
            <h2>Lascia una recensione</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cognome:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descrizione:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Voto (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label>Dottore:</label>
                    <select
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleziona il Dottore</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.doctor_id}>
                                {doctor.first_name} {doctor.last_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Invia Recensione</button>
            </form>
        </div>
    );
};

export default AddReview;
