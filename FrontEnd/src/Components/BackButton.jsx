import { NavLink } from "react-router-dom";

export default function BackButton() {


    return (
        <>
            <NavLink to={"/"} className="btn btn-primary mx-3 d-none d-md-block">Home</NavLink>
            <NavLink to={"/"} className="btn btn-primary mx-3 d-md-none"><i className="bi bi-house-fill"></i></NavLink>
        </>
    )
}