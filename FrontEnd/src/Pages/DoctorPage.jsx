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
    const { doctor } = useGlobalContext();
    //console.log(doctor);

    /* traslate */
    const { t } = useTranslation();

    return (

        <section className="doctor-page d-flex justify-content-center align-items-center min-vh-100">

            <div className="container-sm">
                <h1 className="text-center mb-4">Dottore</h1>

                <div className="card mx-auto border border-2 border-secondary rounded p-3" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title text-center ">
                            <strong className="text-decoration-underline">
                                {doctor.first_name} {doctor.last_name}
                            </strong>

                        </h4>
                        <ul className="list-unstyled">
                            <li><strong>Email:</strong> {doctor.email}</li>
                            <li><strong>Telefono:</strong> {doctor.phone_number}</li>
                            <li><strong>Indirizzo:</strong> {doctor.address}</li>
                            <li>
                                <strong>{t('Specializzazioni')}:</strong>
                                <ul>
                                    {doctor.specializations.split(',').map((spec, index) => (
                                        <li key={index}>
                                            {t(spec.trim()) || spec.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* componente per aggiungere review */}
                <AddReview />

                {/* componente per mostrare le recensioni per ID dottore */}
                <ShowReviewsByDoctorId doctorId={doctorId} />

                {/* componente per calcolare la media di rating di un dottore */}
                <AverageRating doctorId={doctorId} />
            </div>
        </section>
    );
}
