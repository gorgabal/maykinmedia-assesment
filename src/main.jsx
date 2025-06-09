import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelOverview from './HotelOverview.jsx'
import HotelDetail from './HotelDetail.jsx'
import './index.css'

//DONE: create hotel overview page
//DONE: add paging to hotel overview page
//DONE: create hotel details page
//TODO: add tests
//TODO: add documentation

//OPTIONAL: 
//TODO: filter on hotel overview
//TODO: reservation form
//TODO: show reviews for (a) hotel(s). 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelOverview />} />
        <Route path="/detail/:hotelId" element={<HotelDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
