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
                        <img src="/Logo.png" alt="" />
                    </NavLink>
                    <h1>BDoctors</h1>

                </div>

                <BackButton />
            </header>

            <main className="py-4">
                <Outlet />
            </main>
            <footer className="d-flex justify-content-between align-items-center text-white p-4 mt-3">
                <h2>Bdoctors Footer</h2>
            </footer>
        </>
    )
}