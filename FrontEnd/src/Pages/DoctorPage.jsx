import { useGlobalContext } from "../Context/GlobalContext";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import AddReview from "../Components/AddReview";
import "../i118";
import ShowReviewsByDoctorId from "../Components/ShowReviewsByDoctorId";
import AverageRating from "../Components/AverageRating";

export default function DoctorPage() {

    /* recupero id per le review */
    const { doctorId } = useParams();
    /* API per la lista di tutti i dottori  */
    const { doctors } = useGlobalContext();
    /* traslate */
    const { t } = useTranslation();

    return (
        <>
            <h1>Dottori</h1>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>
                        <strong>{doctor.first_name} {doctor.last_name}</strong>
                        <ul>
                            <li>Email: {doctor.email}</li>
                            <li>Telefono: {doctor.phone_number}</li>
                            <li>Indirizzo: {doctor.address}</li>
                            <li>
                                {t('Specializzazioni')}:
                                <ul>
                                    {doctor.specializations.split(',').map((spec, index) => (
                                        <li key={index}>
                                            {t(spec.trim()) || spec.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
            {/* componente per aggiungere review */}
            <AddReview />
            {/* componente per mostrare le recensioni per ID dottore */}
            <ShowReviewsByDoctorId doctorId={doctorId} />
            {/* compononete per calcolcare la media di rating di un dottore  */}
            <AverageRating doctorId={doctorId} />
        </>
    );
}
