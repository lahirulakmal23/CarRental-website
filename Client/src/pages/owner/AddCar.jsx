import React, { useState } from 'react'

const AddCar = () => {

  const [image ,setImage]= useState(null)
  const [car,setCar]=useState({

    brand: '',
    model:'',
    year: 0,
    pricePerday:0,
    category:'',
    transmision:'',
    fule_type:'',
    seating_capacity0,
    locatiom: '',
  })
  return (
    <div className='px-4 py-10 flex-1' >
      
    </div>
  )
}

export default AddCar
