import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import DefaultLayout from '../Pages/DefaultLayout'
import Home from '../Pages/Home'


function App() {

  return (
    <>
      <GlobalContext >
        <BrowserRouter >
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route index element={<Home />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </>
  )
}

export default App
