/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../i118";
import { useTranslation } from "react-i18next";
import { emailRegex, phoneRegex, nameRegex, secureUrlRegex } from "../utils/helper.jsx";

export default function DoctorRegistration() {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);
    const [curriculum, setCurriculum] = useState(''); // Nuovo stato per curriculum
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const messageRef = useRef(null);


    // Funzione per verificare se l'email è già in uso
    async function checkEmailExistence(email) {
        const response = await fetch('http://localhost:3000/doctors');
        const doctors = await response.json();
        return doctors.some(doctor => doctor.email === email);
    }

    function scrollToMessage() {
        setTimeout(() => {
            if (messageRef.current) {
                messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // Funzione per gestire l'invio del form
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Verifica se tutti i campi obbligatori sono compilati
        if (!firstName || !lastName || !email || !phone || !address || selectedSpecializations.length === 0 || !curriculum) {
            setErrorWithMessage('Tutti i campi sono obbligatori.');
            scrollToMessage();
            return;
        }

        // Validazione nome e cognome
        if (!nameRegex.test(firstName)) {
            setErrorWithMessage('Il nome deve iniziare con una lettera maiuscola e contenere almeno 3 lettere.');
            scrollToMessage();
            return;
        }
        if (!nameRegex.test(lastName)) {
            setErrorWithMessage('Il cognome deve iniziare con una lettera maiuscola e contenere almeno 3 lettere.');
            scrollToMessage();
            return;
        }

        // Validazione email
        if (!emailRegex.test(email)) {
            setErrorWithMessage('Formato email non valido.');
            scrollToMessage();
            return;
        }

        // Validazione telefono
        if (!phoneRegex.test(phone)) {
            setErrorWithMessage('Formato telefono non valido.');
            scrollToMessage();
            return;
        }

        if (!secureUrlRegex.test(curriculum)) {
            setErrorWithMessage('Il curriculum deve essere un URL sicuro.');
            scrollToMessage();
            return;
        }

        // Verifica che l'email non sia già in uso
        const emailInUse = await checkEmailExistence(email);
        checkEmailExistence(email).then(() => {
            if (emailInUse) {
                setErrorWithMessage('L\'email è già in uso. Per favore, scegli un\'altra.');
                scrollToMessage();
                return;
            }

            // Creazione dei dati per la registrazione
            const doctorData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone,
                address: address,
                specializations: selectedSpecializations,
                curriculum: curriculum // Aggiungi curriculum ai dati
            };

            // Invio dei dati al server
            fetch('http://localhost:3000/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doctorData),
            })
                .then((res) => res.json())
                .then((data) => {
                    setErrorWithMessage('Medico registrato con successo! Verrai reindirizzato alla homepage...');
                    scrollToMessage();

                    setTimeout(() => {
                        setSuccessMessage('');
                        navigate('/');
                    }, 4000);
                })
                .catch((error) => {
                    console.error('Errore durante la registrazione:', error);
                    setErrorMessage('Errore durante la registrazione del medico.');
                });
        })
    }

    // Fetch delle specializzazioni dal server
    useEffect(() => {
        fetch('http://localhost:3000/specializations')
            .then(res => res.json())
            .then(data => setSpecializations(data))
            .catch(error => console.error(error));
    }, []);

    // Funzione per gestire la selezione delle specializzazioni
    function handleCheckboxChange(specId) {
        if (selectedSpecializations.includes(specId)) {
            setSelectedSpecializations(selectedSpecializations.filter((id) => id !== specId));
        } else {
            setSelectedSpecializations([...selectedSpecializations, specId]);
        }
    }

    function setErrorWithMessage(message) {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 4000);
    }

    return (
        <div className="container prova">
            <h1 className='py-3'>{t('Registrazione')}</h1>
            <form onSubmit={handleFormSubmit} autoComplete='off'>
                <div className='bg-light p-4'>
                    {/* Campo per il nome */}
                    <div className="mb-3">
                        <label htmlFor="firstName">{t('Nome')}*</label>
                        <input type="text" className="form-control" placeholder='es. Raqueline' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    {/* Campo per il cognome */}
                    <div className="mb-3">
                        <label htmlFor="lastName">{t('Cognome')}*</label>
                        <input type="text" className="form-control" placeholder='es. Rapariga' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    {/* Campo per l'email */}
                    <div className="mb-3">
                        <label htmlFor="email">{t('Email')}*</label>
                        <input type="email" className="form-control" placeholder='es. raquelinerapariga@email.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {/* Campo per il telefono */}
                    <div className="mb-3">
                        <label htmlFor="phone">{t('Telefono')}*</label>
                        <input type="tel" className="form-control" placeholder='es. +39 345 898 2724' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    {/* Campo per l'indirizzo */}
                    <div className="mb-3">
                        <label htmlFor="address">{t('Indirizzo')}*</label>
                        <input type="text" className="form-control" placeholder='es. vicolo della liberta, 6, MI' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    {/* Sezione per la selezione delle specializzazioni */}
                    <div className="mb-3">
                        <label>{t('specializations')}*</label>
                        {specializations.map(spec => (
                            <div key={spec.id}>
                                <input
                                    type="checkbox"
                                    id={spec.id}
                                    checked={selectedSpecializations.includes(spec.id)}
                                    onChange={() => handleCheckboxChange(spec.id)}
                                />
                                <label htmlFor={spec.id} className='p-2'>{t(spec.specialization_name)}</label> {/* Tradurre il nome della specializzazione */}
                            </div>
                        ))}
                    </div>
                    {/* Campo per il curriculum */}
                    <div className="mb-3">
                        <label htmlFor="curriculum">{t('Curriculum')}*</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='es. https://www.seusite.com/curriculo/jose-silva'
                            value={curriculum}
                            onChange={(e) => setCurriculum(e.target.value)}
                            required
                        />
                    </div>
                    {/* Bottone di submit */}
                    <button type="submit" className="btn btn-primary mb-5">{t('Registrati')}</button>
                </div>
            </form>

            <div ref={messageRef}>
                {/* Messaggi di errore e successo */}
                {errorMessage && <div className="alert alert-danger mb-5">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success mb-5">{successMessage}</div>}
            </div>
        </div>
    );

}


