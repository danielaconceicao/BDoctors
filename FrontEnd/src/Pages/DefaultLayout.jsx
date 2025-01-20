import { Outlet } from "react-router-dom"
import BackButton from "../Components/BackButton";
import style from "../styles/DefaultLayout.module.css"
import { NavLink } from "react-router-dom";

export default function DefaultLayout() {
    return (

        <>
            <header className="d-flex justify-content-between align-items-center px-4 py-2 ">
                <div className="d-flex align-items-center">
                    <NavLink className={style.logo} to="/">
                        <img src="Logo.png" alt="" />
                    </NavLink>
                    <h1>BDoctors</h1>

                </div>

                <BackButton />
            </header>

            <main className="py-4">
                <Outlet />
            </main>
            <footer className="d-flex flex-column justify-content-center align-items-center text-white mt-3">
                <div>
                    <i className="bi bi-telephone"></i>
                    <i className="bi bi-whatsapp px-5"></i>
                    <i className="bi bi-instagram"></i>
                </div>
                <div className="py-2">
                    <span>Terms of Use <i style={{ fontSize: '4px', verticalAlign: 'middle' }} className="bi bi-circle"></i> Privacy Policy</span>
                </div>
                <div>
                    <span>&copy; 2025 Created by group 6</span>
                </div>

            </footer>
        </>
    )
}