import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext/GlobalContext'
import DefaultLayout from '../Pages/DefaultLayout'
import Home from '../Pages/Home'
import AdvancedSearchPage from '../Pages/AdvancedSearchPage'

function App() {

  return (
    <>
      <GlobalContext >
        <BrowserRouter >
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route index element={<Home />} />
              <Route path="/AdvancedSearchPage" element={<AdvancedSearchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </>
  )
}

export default App
