import React, { useState } from 'react'
import { assets } from '../../assets/constance/constance'

const AddCar = () => {

  const currency  = import.meta.env.VITE_CURRENCY
  const [image ,setImage]= useState(null)
  const [car,setCar]=useState({

    brand: '',
    model:'',
    year: 0,
    pricePerday:0,
    category:'',
    transmision:'',
    fule_type:'',
    seating_capacity: 0,
    location: '',
    description:'',
  })

    const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Car Data:", car);
    console.log("Image:", image);

    // later: send to backend
  };
  return (
    <div className='px-4   flex-1 items-center w-full m-4' >
      <h1 className='font-semibold text-xl'>Add New Car</h1>
      <form onSubmit={onSubmitHandler} className='mt-8 flex flex-col gap-6 w-full max-w-lg' >  
        {/* Car Image Upload */}
        <div className='flex flex-1 gap-4'>
          <label htmlFor='car-image' >
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt='Car' className='w-48 h-32 object-cover rounded-md cursor-pointer' />
            <input type='file' id='car-image' accept='image/*' hidden onChange={e=> setImage(e.target.files[0])}/>
          </label>
          <p className='text-md text-gray-500 items-center mt-10'>Upload picture of your car</p>

        </div>
        {/* Car Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col w-full'>
                <label>Brand</label>
                <input type="text" name="brand" id="brand" placeholder='e.g. BMW , AUdi' value={car.brand} onChange={e=> setCar({...car, brand: e.target.value})} className='px-3 py-2 mt-1 border rounded-md border-borderColor' />
              </div>

               <div className='flex flex-col w-full'>
                <label>Model</label>
                <input type="text" name="model" id="model" required placeholder='e.g. X5, A4' value={car.model} onChange={e=> setCar({...car, model: e.target.value})} className='px-3 py-2 mt-1 border rounded-md border-borderColor' />
              </div>
          
        </div>

        {/* Additional car details inputs can be added here similarly */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
                <label>Year</label>
                <input type="number" name="year" id="year" required placeholder='e.g. 2020, 2021' value={car.year} onChange={e=> setCar({...car, year: e.target.value})} className='px-3 py-2 mt-1 border rounded-md border-borderColor' />
          </div>
           <div className='flex flex-col w-full'>
                <label>Daily price</label>
                <input type="number" name="pricePerday" id="pricePerday" required placeholder='e.g. 2020, 2021' value={car.pricePerday} onChange={e=> setCar({...car, pricePerday: e.target.value})} className='px-3 py-2 mt-1 border rounded-md border-borderColor' />
          </div>

             <div className='flex flex-col w-full'>
                <label>Category</label>
                <select onChange={e=> setCar({...car ,category: e.target.value}) } value={car.category} className='px-3 py-2 mt-1 border rounded-md border-borderColor text-gray-500' >'
                  <option value="">Select Category</option>
                  <option value="car">Car</option>'
                  <option value="SUV">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="van">Van</option>
                </select>
          </div>

        </div>
        {/* car transmision , fuel type , seating capacity , location  ,description*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <div className='flex flex-col w-full'>
                <label> Transmission</label>
                <select onChange={e=> setCar({...car ,transmision: e.target.value}) } value={car.transmision} className='mt-2 p-2 border border-gray-300 rounded-md'>'
                  <option value="">Select  a transmision</option>
                  <option value="automatic">Automatic</option>'
                  <option value="manual">Manual</option>
                  
                </select>
          </div>

              <div className='flex flex-col w-full'>
                <label> Fuel Type</label>

                <select onChange={e=> setCar({...car ,fule_type: e.target.value}) } value={car.fule_type} className='mt-2 p-2 border border-gray-300 rounded-md'>'
                  <option value="">Select Fuel Type</option>
                  <option value="petrol">Petrol</option>'
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
          </div>

              <div className='flex flex-col w-full'>
                <label>Seat Capacity</label>
                <input type="number" name="seatCapacity" id="seatCapacity" required placeholder='e.g. 2, 4, 5' value={car.seatCapacity} onChange={e=> setCar({...car, seatCapacity: e.target.value})} className='px-3 py-2 mt-1 border rounded-md border-borderColor' />
              </div>

          <div className=''>
                <label> Location</label>
                <select onChange={e=> setCar({...car ,location: e.target.value}) } value={car.location} className='mt-2 p-2 border border-gray-300 rounded-md w-100'>
                  <option value="">Select Location</option>
                  <option value="colombo">Colombo</option>'
                  <option value="kandy">Kandy</option>
                  <option value="galle">Galle</option>
                  <option value="matara">Matara</option>
                </select>
          </div>

          <div className='flex flex-col w-full col-span-3'>
                <label> Description</label>
                <textarea name="description" id="description" required placeholder='e.g. New York, Los Angeles' value={car.description} onChange={e=> setCar({...car, description: e.target.value})} className='px-3 py-2 mt-2 border rounded-md border-borderColor w-100 h-20' />
          </div>
        </div>
        <button className='flex items-center gap-2 px-4 py-2.5 bg-primary rounded-md font-medium cursor-pointer w-50 text-white'>
          <img src={assets.tick_icon} alt="car icon" />
          List Your Car
        </button>

      </form>
    </div>
  )
}

export default AddCar
