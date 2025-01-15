import style from '../styles/AdvancedSearchPage.module.css'
import { useGlobalContext } from '../Context/GlobalContext.jsx'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import "../i118.js";


export default function AdvancedSearchPage() {


    const { filteredDoctors, setDoctor } = useGlobalContext()
    const { t } = useTranslation();

    const navigate = useNavigate();

    console.log(filteredDoctors);

    function handleDoctorsDetails(e) {
        const doctotId = e.currentTarget.getAttribute('data-selected-doctor')
        console.log(doctotId);

        const selectedDoctor = filteredDoctors.find(doctor => parseInt(doctor.doctor_id) === parseInt(doctotId))
        console.log(selectedDoctor);

        setDoctor(selectedDoctor)
        navigate('/DoctorPage')

    }





    return (
        <>
            <div className={style.dev_container}>
                <h3>Filtra la ricerca</h3>
                <form className='d-flex'>
                    <select className="form-select mx-2" aria-label="Default select example">
                        <option selected>Filtra per...</option>
                        <option value="1">Nome</option>
                        <option value="2">Cognome</option>
                        <option value="3">Indirizzo</option>
                    </select>
                    <button type='submit' className='btn btn-dark'>Filtra</button>
                    <button className='btn btn-secondary mx-2'>Home</button>
                </form>

                {filteredDoctors?.map((doctor, index) => (

                    <div
                        key={index}
                        className={`container-sm container-md container-lg container-xl container-xxl ${style.doctor} `}
                        onClick={handleDoctorsDetails}
                        data-selected-doctor={doctor.doctor_id}
                    >

                        <img src="https://picsum.photos/60/90" alt="ProfileImg" />
                        <p>Nome: {doctor.first_name}</p>
                        <p>Cognome: {doctor.last_name}</p>
                        <p>Email: {doctor.email}</p>
                        <p>Tel: {doctor.phone_number}</p>
                        <p>Indirizzo: {doctor.address}</p>
                        <p>Specializzazione: {doctor.specializations.split(",").map((spec) => t(spec.trim())).join(", ")}</p>

                    </div>))}

            </div>


        </>
    )
}