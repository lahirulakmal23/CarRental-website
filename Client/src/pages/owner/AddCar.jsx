import React, { useState } from 'react';
import { assets } from '../../assets/constance/constance';
import { MdDirectionsCar, MdCloudUpload, MdCheck } from 'react-icons/md';

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.6px]">
      {label}
    </label>
    {children}
  </div>
);

const inputCls = "px-3 py-2 text-[13px] border border-gray-200 rounded-lg bg-white text-gray-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder:text-gray-300";
const selectCls = `${inputCls} cursor-pointer text-gray-700`;

// ─── Section Card ─────────────────────────────────────────────────────────────
const Section = ({ title, sub, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
      <h2 className="text-[13px] font-bold text-gray-800 m-0">{title}</h2>
      {sub && <p className="text-[11px] text-gray-400 mt-[2px] mb-0">{sub}</p>}
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AddCar = () => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '', model: '', year: 0, pricePerday: 0,
    category: '', transmision: '', fule_type: '',
    seating_capacity: 0, location: '', description: '',
  });

  const set = (key) => (e) => setCar({ ...car, [key]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Car Data:', car);
    console.log('Image:', image);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-6 py-8 pb-16">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <MdDirectionsCar size={18} className="text-indigo-500" />
          </div>
          <h1 className="text-[22px] font-bold text-gray-900 m-0">Add New Car</h1>
        </div>
        <p className="text-[13px] text-gray-500 ml-11">
          Fill in the details below to list your car for rent.
        </p>
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 max-w-3xl">

        {/* Image Upload */}
        <Section title="Car Photo" sub="Upload a clear photo of your car">
          <label htmlFor="car-image" className="cursor-pointer block">
            <div className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
              image ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/20'
            }`} style={{ height: 180 }}>
              {image ? (
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Car preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-white text-center">
                      <MdCloudUpload size={28} className="mx-auto mb-1" />
                      <span className="text-[12px] font-semibold">Change Photo</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <MdCloudUpload size={32} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-gray-500">Click to upload</p>
                  <p className="text-[11px] text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
            <input type="file" id="car-image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>
        </Section>

        {/* Basic Info */}
        <Section title="Basic Information" sub="Brand, model and year">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Brand">
              <input type="text" placeholder="e.g. BMW, Audi, Toyota" value={car.brand} onChange={set('brand')} className={inputCls} />
            </Field>
            <Field label="Model">
              <input type="text" placeholder="e.g. X5, A4, Camry" value={car.model} onChange={set('model')} required className={inputCls} />
            </Field>
            <Field label="Year">
              <input type="number" placeholder="e.g. 2022" value={car.year || ''} onChange={set('year')} required className={inputCls} />
            </Field>
            <Field label={`Daily Price (${currency})`}>
              <input type="number" placeholder="e.g. 75" value={car.pricePerday || ''} onChange={set('pricePerday')} required className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Specs */}
        <Section title="Car Specifications" sub="Category, transmission, fuel and seating">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Category">
              <select value={car.category} onChange={set('category')} className={selectCls}>
                <option value="">Select</option>
                <option value="car">Car</option>
                <option value="SUV">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="van">Van</option>
              </select>
            </Field>
            <Field label="Transmission">
              <select value={car.transmision} onChange={set('transmision')} className={selectCls}>
                <option value="">Select</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </Field>
            <Field label="Fuel Type">
              <select value={car.fule_type} onChange={set('fule_type')} className={selectCls}>
                <option value="">Select</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </select>
            </Field>
            <Field label="Seat Capacity">
              <input type="number" placeholder="e.g. 5" value={car.seating_capacity || ''} onChange={set('seating_capacity')} required className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Location & Description */}
        <Section title="Location & Description" sub="Where is the car and what makes it special">
          <div className="flex flex-col gap-4">
            <Field label="Location">
              <select value={car.location} onChange={set('location')} className={`${selectCls} max-w-xs`}>
                <option value="">Select a city</option>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                <option value="galle">Galle</option>
                <option value="matara">Matara</option>
              </select>
            </Field>
            <Field label="Description">
              <textarea
                placeholder="Describe your car — condition, features, anything renters should know…"
                value={car.description}
                onChange={set('description')}
                required
                rows={4}
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-[10px] bg-indigo-500 hover:bg-indigo-600 text-white text-[13px] font-semibold rounded-xl cursor-pointer border-none transition-colors shadow-sm"
          >
            <MdCheck size={17} />
            List Your Car
          </button>
          <button
            type="button"
            className="px-6 py-[10px] text-[13px] font-medium text-gray-500 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCar;