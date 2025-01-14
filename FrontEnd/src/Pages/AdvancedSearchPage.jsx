import style from '../styles/AdvancedSearchPage.css';

export default function AdvancedSearchPage() {





    return (
        <>
            <div className={`container-sm container-md container-lg container-xl container-xxl ${style.doctor} `}>
                <img src="https://picsum.photos/60/90" alt="ProfileImg"></img>
                <p>Nome: <span>Paolo</span></p>
                <p>Cognome: <span>Rossi</span></p>
                <p>Email: <span>doctor@email.com</span></p>
                <p>Tel: <span>3479875828</span></p>
                <p>Indirizzo: <span>Via Garibaldi civico 3, Trieste </span></p>
                <p>Specializzazione: <span>Neurochirurgo</span></p>

            </div>
        </>
    )
}