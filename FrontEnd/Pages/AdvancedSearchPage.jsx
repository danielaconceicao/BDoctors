import style from './AdvancedSearchPage.module.css'

export default function AdvancedSearchPage() {





    return (
        <>
            <div className={`${style.doctor} ${style.mx}`}>
                <img src="https://picsum.photos/60/90" alt="ProfileImg"></img>
                <p>Nome: <span>Paolo</span></p>
                <p>Cognome: <span>Rossi</span></p>
                <p>Email: <span>doctor@email.com</span></p>
                <p>Indirizzo: <span>Via Garibaldi civico 3, Trieste </span></p>
                <p>Specializzazione: <span>Neurochirurgo</span></p>

            </div>
        </>
    )
}