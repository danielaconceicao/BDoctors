import style from '../styles/AdvancedSearchPage.module.css'
import { useGlobalContext } from '../Context/GlobalContext.jsx'

export default function AdvancedSearchPage() {


    const { filteredDoctors } = useGlobalContext()

    console.log(filteredDoctors);





    return (
        <>
            <div className={style.dev_container}>
                {filteredDoctors?.map((doctor, index) => (

                    <div key={index} className={`container-sm container-md container-lg container-xl container-xxl ${style.doctor} `}>
                        <img src="https://picsum.photos/60/90" alt="ProfileImg" />
                        <p>Nome: {doctor.first_name}</p>
                        <p>Cognome: {doctor.last_name}</p>
                        <p>Email: {doctor.email}</p>
                        <p>Tel: {doctor.phone_number}</p>
                        <p>Indirizzo: {doctor.address}</p>
                        <p>Specializzazione: {doctor.specializations}</p>

                    </div>))}

            </div>


        </>
    )
}