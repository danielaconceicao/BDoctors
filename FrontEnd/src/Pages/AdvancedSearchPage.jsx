import style from '../styles/AdvancedSearchPage.module.css'
import { useGlobalContext } from '../Context/GlobalContext.jsx'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import "../i118.js";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdvancedSearchPage() {

    const { filteredDoctors, setFilteredDoctors, setDoctor, selectedSpecialization } = useGlobalContext()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { specialization } = useParams()

    // Stati per selezione del filtro e input di ricerca
    const [searchText, setSearchText] = useState('')
    const [filterOption, setFilterOption] = useState('')


    async function getDoctorBySpecializations() {
        try {
            const response = await fetch(`http://localhost:3000/doctors/specializations/${specialization}`)
            const data = await response.json()
            setFilteredDoctors(data)
        } catch (error) {
            console.error("Errore nel recupero dei dati", error)
        }
    }


    useEffect(() => {
        getDoctorBySpecializations()
    }, [])


    // Funzione per gestire il click sul dottore
    function handleDoctorsDetails(e) {
        const doctorName = e.currentTarget.getAttribute('data-selected-name')
        const doctorSurname = e.currentTarget.getAttribute('data-selected-surname')

        navigate(`/DoctorPage/${doctorName}${doctorSurname}`)
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
                    return doctor.first_name.toLowerCase().includes(searchTextLower);
                case '2':
                    return doctor.last_name.toLowerCase().includes(searchTextLower);
                case '3':
                    return doctor.address.toLowerCase().includes(searchTextLower);
                default:
                    return true;
            }
        });
    }


    function maxLenght(params) {
        return params.slice(0, 20) + "...";

    }

    return (
        <>
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
                        <option value="1">Nome</option>
                        <option value="2">Cognome</option>
                        <option value="3">Indirizzo</option>
                    </select>
                    <input
                        type="text"
                        className="form-control mx-2"
                        placeholder="Cerca..."
                        value={searchText}
                        onChange={handleSearchTextChange}
                    />

                </form>

                <h4>{t(selectedSpecialization)}</h4>

                {filterDoctors().map((doctor, index) => (
                    <div
                        key={index}
                        className={`${style.doctor} `}
                        onClick={handleDoctorsDetails}
                        data-selected-name={doctor.first_name}
                        data-selected-surname={doctor.last_name}

                    >
                        <img src="https://picsum.photos/60/90" alt="ProfileImg" />
                        <p className=''>
                            <strong>Nome: </strong> {doctor.first_name}
                        </p>
                        <p><strong>Cognome: </strong> {doctor.last_name}</p>
                        <p className={style.px576_p}><strong>Email: </strong> {doctor.email}</p>
                        <p className={style.px1100_p}><strong>Tel: </strong> {doctor.phone_number}</p>
                        <p className={style.px1100_p}><strong>Indirizzo: </strong> {maxLenght(doctor.address)}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
