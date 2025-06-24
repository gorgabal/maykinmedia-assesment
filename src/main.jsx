import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HotelOverview from './HotelOverview.jsx'
import HotelDetail from './HotelDetail.jsx'
import './index.css'

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
