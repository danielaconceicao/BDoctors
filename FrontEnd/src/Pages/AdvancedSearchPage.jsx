import style from '../styles/AdvancedSearchPage.module.css'
import { useGlobalContext } from '../Context/GlobalContext.jsx'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import "../i118.js";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AdvancedSearchPage() {

    const { filteredDoctors, setFilteredDoctors } = useGlobalContext()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { specialization } = useParams()

    // Stati per selezione del filtro e input di ricerca
    const [searchText, setSearchText] = useState('')
    const [filterOption, setFilterOption] = useState('')
    const [ratings, setRatings] = useState({}) // Stato per i rating dei dottori

    // Funzione per recuperare i dottori per specializzazione
    async function getDoctorBySpecializations() {
        try {
            const response = await fetch(`http://localhost:3000/doctors/specializations/${specialization}`)
            const data = await response.json()
            setFilteredDoctors(data)
        } catch (error) {
            console.error("Errore nel recupero dei dati", error)
        }
    }

    // Funzione per recuperare il rating di un dottore
    async function getDoctorRating(id) {
        try {
            const response = await fetch(`http://localhost:3000/doctors/${id}/average-rating`)
            const data = await response.json()
            return data.average_rating
        } catch (error) {
            console.error("Errore nel recupero dei dati", error)
        }
    }

    // Funzione per gestire il click sul dottore
    function handleDoctorsDetails(e) {
        const doctorName = e.currentTarget.getAttribute('data-selected-name')
        const doctorSurname = e.currentTarget.getAttribute('data-selected-surname')
        const doctor_id = e.currentTarget.getAttribute('data-selected-doctor_id')

        navigate(`/DoctorPage/${doctorName}${doctorSurname}/${doctor_id}`)
        // navigate(`/DoctorPage/${doctor_id}`);
    }

    // Funzione per gestire la selezione del filtro
    function handleFilterChange(e) {
        setFilterOption(e.target.value)
    }

    // Funzione per gestire il cambio del testo nella barra di ricerca
    function handleSearchTextChange(e) {
        setSearchText(e.target.value)
    }

    // Funzione per filtrare i dottori in base all'opzione selezionata e al testo di ricerca
    function filterDoctors() {
        if (!filterOption || !searchText) {
            return filteredDoctors
        }

        return filteredDoctors.filter((doctor) => {
            const searchTextLower = searchText.toLowerCase()

            switch (filterOption) {
                case '1':
                    return doctor.first_name.toLowerCase().includes(searchTextLower) || doctor.last_name.toLowerCase().includes(searchTextLower)
                case '2':
                    return doctor.specializations.toLowerCase().includes(searchTextLower);
                default:
                    return true;
            }
        });
    }

    // Effettua il recupero dei dottori e dei loro rating
    useEffect(() => {
        getDoctorBySpecializations()
    }, [specialization])

    useEffect(() => {
        // Recupera i rating dei dottori quando i dottori vengono filtrati o aggiornati
        const fetchRatings = async () => {
            const newRatings = {}
            for (const doctor of filteredDoctors) {
                const rating = await getDoctorRating(doctor.doctor_id)
                newRatings[doctor.doctor_id] = rating
            }
            setRatings(newRatings)
        }

        if (filteredDoctors.length > 0) {
            fetchRatings()
        }
    }, [filteredDoctors]) // Ricarica i rating ogni volta che i dottori vengono aggiornati

    function starRating(rating) {
        if (rating) {
            const starArray = []
            for (let i = 0; i < Math.round(rating); i++) {
                const star = <span key={i} className="bi bi-star-fill text-warning"></span>
                starArray.push(star)
            }
            return starArray
        }
    }

    return (
        <div className={`container-sm container-md container-lg container-xl container-xxl ${style.dev_container}`}>
            <h3>Filtra la ricerca</h3>
            <form className='d-flex' onSubmit={(e) => e.preventDefault()}>
                <select
                    className="form-select mx-2"
                    aria-label="Default select example"
                    onChange={handleFilterChange}
                    value={filterOption}
                >
                    <option value="">Filtra per...</option>
                    <option value="1">Nome e cognome</option>
                    <option value="2">Specializzazione</option>

                </select>
                <input
                    type="text"
                    className="form-control mx-2"
                    placeholder="Cerca..."
                    value={searchText}
                    onChange={handleSearchTextChange}
                />

            </form>

            <h4>{t(specialization)}</h4>

            {filterDoctors().map((doctor, index) => (
                <div
                    key={index}
                    className={`${style.doctor} `}
                    onClick={handleDoctorsDetails}
                    data-selected-name={doctor.first_name}
                    data-selected-surname={doctor.last_name}
                    data-selected-doctor_id={doctor.doctor_id}
                >
                    <img src="https://picsum.photos/60/90" alt="ProfileImg" />
                    <p><strong>Nome: </strong> {doctor.first_name}</p>
                    <p><strong>Cognome: </strong> {doctor.last_name}</p>
                    <p><strong>Rating: </strong> {ratings[doctor.doctor_id] ? starRating(ratings[doctor.doctor_id]) : 'No rating'}</p>
                </div>
            ))}
        </div>
    );
}
