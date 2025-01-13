import { Outlet } from "react-router-dom"

export default function DefaultLayout() {
    return (

        <>
            <header>
                <h1>Default Layout</h1>

            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <h2>Footer</h2>
            </footer>
        </>
    )
}