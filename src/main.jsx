import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HotelOverview from './HotelOverview.jsx'
import './index.css'

//TODO: create hotel overview page
//TODO: add paging to hotel overview page
//TODO: create hotel details page
//TODO: add tests
//TODO: add documentation

//OPTIONAL: 
//TODO: filter on hotel overview
//TODO: reservation form
//TODO: show reviews for (a) hotel(s). 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HotelOverview />
  </StrictMode>,
)
