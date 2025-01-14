import { Outlet } from "react-router-dom"

export default function DefaultLayout() {
    return (

        <>
            <header>
                <h1>Bdoctors</h1>

            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <h2>Bdoctors Footer</h2>
            </footer>
        </>
    )
}