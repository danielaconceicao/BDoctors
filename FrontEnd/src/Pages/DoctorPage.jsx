import { useGlobalContext } from "../Context/GlobalContext";
import AddReview from "../Components/AddReview";
import "../i118";

export default function DoctorPage() {

    const { doctors } = useGlobalContext();
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
                                Specializzazioni:
                                <ul>
                                    {(doctor.specializzazioni || "")
                                        .split(',')
                                        .map((spec, index) => (
                                            <li key={index}>
                                                {specializationTranslations[spec.trim()] || spec}
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>

            <AddReview />
        </>
    );
}
