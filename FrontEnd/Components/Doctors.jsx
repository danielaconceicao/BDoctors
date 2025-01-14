import { useGlobalContext } from "../GlobalContext/GlobalContext";
import AddReview from "./AddReview";

export default function Doctors() {

    const { doctors } = useGlobalContext();

    /* traduzione delle specializzazioni  */
    const specializationTranslations = {
        "Cardiology": "Cardiologia",
        "Dermatology": "Dermatologia",
        "Pediatrics": "Pediatria",
        "Neurology": "Neurologia",
        "Orthopedics": "Ortopedia",
        "Ophthalmology": "Oftalmologia",
        "Oncology": "Oncologia",
        "Psychiatry": "Psichiatria",
        "Radiology": "Radiologia",
        "Anesthesiology": "Anestesiologia"
    };

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
