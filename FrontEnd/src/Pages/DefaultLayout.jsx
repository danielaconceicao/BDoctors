import { Outlet } from "react-router-dom"
import BackButton from "../Components/BackButton";

export default function DefaultLayout() {
    return (

        <>
            <header className="d-flex justify-content-between align-items-center bg-dark text-white p-4 mb-4">
                <h1>Bdoctors</h1>
                <BackButton />
            </header>

            <main>
                <Outlet />
            </main>
            <footer className="d-flex justify-content-between align-items-center bg-dark text-white p-4 mt-3">
                <h2>Bdoctors Footer</h2>
            </footer>
        </>
    )
}