import { NavLink } from "react-router-dom"

export function NotFoundPage() {
    return (
        <>
            <div className="container text-center">
                <h3 className="mt-5">Ci dispiace ma la pagina che stai cercando non esiste.. Clicca il pulsante qui sotto per tornare alla Home</h3>
                <NavLink to={"/"} className="btn home_button mt-4 col-12 col-md-4">Home</NavLink>
            </div>
        </>
    )
}