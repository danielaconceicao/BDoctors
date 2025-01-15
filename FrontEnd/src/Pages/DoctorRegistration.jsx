import { useState, useEffect } from 'react';
import BackButton from '../Components/BackButton';
import { useNavigate } from 'react-router-dom';
import "../i118";
import { useTranslation } from "react-i18next";

export default function DoctorRegistration() {

    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    /* prendendo tutte le specializzazioni */
    useEffect(() => {
        fetch('http://localhost:3000/specializations')
            .then(res => res.json())
            .then(data => {
                setSpecializations(data)
            })
            .catch((error) => { console.error(error) });
    }, []);


    function handleCheckboxChange(specId) {
        if (selectedSpecializations.includes(specId)) {
            setSelectedSpecializations(selectedSpecializations.filter((id) => id !== specId));
        } else {
            setSelectedSpecializations([...selectedSpecializations, specId]);
        }
    }


    function handleFormSubmit(e) {
        e.preventDefault();

        const doctorData = { first_name: firstName, last_name: lastName, email: email, phone_number: phone, address: address, specializations: selectedSpecializations };
        const bdoctors = 'http://localhost:3000/doctors';

        fetch(bdoctors, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log(data);

                setSuccessMessage('Medico registrato con successo');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setAddress('');
                setSelectedSpecializations([]);

                setTimeout(() => {
                    setSuccessMessage('');
                    navigate(-1);
                }, 10000);
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log('Errore durante la registrazione del medico');
            });
    }


    return (
        <div className="container">
            <div id="form-card" className="card">
                <div className="card-body">

                    {successMessage && <div>{successMessage}<i className="bi bi-clipboard2-check"></i></div>}

                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input name="name" id="name" type="text" className="form-control" placeholder="il tuo nome. es: Raqueline" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name">Cognome</label>
                            <input name="lastName" id="lastName" type="text" className="form-control" placeholder="il tuo cognome. es: Rapariga" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='latuaemail@email.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label className='pb-3'>Specializzazione</label>
                            {specializations.map((spec) => (
                                <div key={spec.id} className="form-check">
                                    <input type="checkbox" id={`specialization-${spec.id}`} value={spec.id} className="form-check-input" checked={selectedSpecializations.includes(spec.id)} onChange={() => handleCheckboxChange(spec.id)} />
                                    <label htmlFor={`specialization-${spec.id}`} className="form-check-label">
                                        {t(spec.specialization_name)}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="form-outline mb-3 pt-3">
                            <label className="form-label" htmlFor="typePhone">Numero di telefono</label>
                            <input type="tel" id="typePhone" className="form-control" placeholder='345678912' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Indirizzo</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="via piemonte, 5, MI" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Inviare <i className="bi bi-send"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}