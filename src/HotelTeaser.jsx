import { useState } from 'react'

function HotelTeaser({name, avilability: availability, price, description, imageURL}) {
  const [hotels, setHotels] = useState([])

  //TODO: create hotel teaser component, this is a placeholder for the hotel teaser component
  return (
    <>
        <h3>Hotel Teaser</h3>
        <p>Name: {name}</p>
        <p>Availability: {availability}</p>
        <p>Price: {price}</p>
        <p>Description: {description}</p>
        <img src={imageURL} alt={name} />
    </>
  )
}

export default HotelTeaser
