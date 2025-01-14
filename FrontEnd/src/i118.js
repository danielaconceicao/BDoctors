import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "Cardiology": "Cardiology",
            "Dermatology": "Dermatology",
            "Pediatrics": "Pediatrics",
            "Neurology": "Neurology",
            "Orthopedics": "Orthopedics",
            "Ophthalmology": "Ophthalmology",
            "Oncology": "Oncology",
            "Psychiatry": "Psychiatry",
            "Radiology": "Radiology",
            "Anesthesiology": "Anesthesiology",
        },
    },
    it: {
        translation: {
            "Cardiology": "Cardiologia",
            "Dermatology": "Dermatologia",
            "Pediatrics": "Pediatria",
            "Neurology": "Neurologia",
            "Orthopedics": "Ortopedia",
            "Ophthalmology": "Oftalmologia",
            "Oncology": "Oncologia",
            "Psychiatry": "Psichiatria",
            "Radiology": "Radiologia",
            "Anesthesiology": "Anestesiologia",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "it", // Imposta la lingua di default
    interpolation: {
        escapeValue: false, // React già fa l'escaping automaticamente
    },
});

export default i18n;
