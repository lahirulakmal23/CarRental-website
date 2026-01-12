import React, { use,useEffect,useState } from 'react'
import { dummyCarData,assets } from '../../assets/constance/constance';

const ManageCar = () => {
  const [cars ,setCars]= useState([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchCars = async () => {
    setCars( dummyCarData );
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <h1 className='text-2xl font-bold'>Manage Car</h1>
      <h4>Here you can manage your cars</h4>

      <div className='max-w-3xl w-full rounded-md mt-6  '>
        <table className='w-full border-collapse  text-left text-sm text-gray-600'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3  font-medium'>Car</th>
              <th className='px-4 py-3 font-medium max-md:hidden'>Category</th>
              <th className='px-4 py-3 font-medium'>Price Per Day</th>
              <th className='px-4 py-3 font-medium'>Status</th>
              <th className='px-4 py-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (  
              <tr key={car.id} className=' hover:bg-gray-50'>
                <td className='px-4 py-3 flex items-center gap-3'>
                  <img src={car.image} alt={car.model} className='w-16 h-10 object-cover rounded-md' /> 
                  <div>
                    <div className='font-medium'>{car.brand}  {car.model}</div>
                    <div className='text-xs text-gray-500'>{car.seating_capacity} seats .{car.transmission}</div>
                  </div>

                </td>
                <td className='px-4 py-3 max-md:hidden'>{car.category}</td>
                <td className='px-4 py-3'>${currency} {car.pricePerDay}</td>
                <td className='px-4 py-3'>
                  <span
  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    car.isAvaliable
      ? "bg-green-200 text-green-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {car.isAvaliable ? "Available" : "Rented Out"}
</span>


                </td>
                <td className='px-4 py-3'>
                  <button className='cursor-pointer mr-2 cu'><img src={assets.eye_close_icon } alt="" /></button>
                  <button className=' cursor-pointer'><img src={assets.delete_icon} alt="" /></button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>  
      
    </div>
  )
}

export default ManageCar
