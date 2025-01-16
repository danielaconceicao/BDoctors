import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { GlobalContext } from './Context/GlobalContext'
import DefaultLayout from './Pages/DefaultLayout'
import Home from './Pages/Home'
import AdvancedSearchPage from './Pages/AdvancedSearchPage'
import DoctorRegistration from './Pages/DoctorRegistration'
import DoctorPage from './Pages/DoctorPage'


function App() {

  return (
    <>
      <GlobalContext >
        <BrowserRouter >
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route index element={<Home />} />
              <Route path="/AdvancedSearchPage/:specialization" element={<AdvancedSearchPage />} />
              <Route path="/DoctorRegistration" element={<DoctorRegistration />} />
              <Route path="/DoctorPage/:doctor_id" element={<DoctorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </>
  )
}

export default App
