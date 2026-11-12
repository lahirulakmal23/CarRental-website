import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import AllCars from "./pages/Cars";
import Mybooking from "./pages/Mybooking";
import Layout from "./pages/owner/Layout";
import Dashbord from "./pages/owner/Dashborad"
import ManageCar from "./pages/owner/ManageCar";
import ManageBooking from "./pages/owner/ManageBooking";
import AddCar from "./pages/owner/AddCar";
import Login from "./components/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div className="App">
     {showLogin && <Login setShowLogin={setShowLogin} initialState={showLogin === "register" ? "register" : "login"} />}

      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<AllCars />} />
        <Route path="/my-bookings" element={<Mybooking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/login" element={<Login setShowLogin={setShowLogin} />} />
        

        <Route path="/owner" element={<Layout/>}>
          <Route index element={<Dashbord/>}/>
          <Route path="add-car" element={<AddCar/>}/>
          <Route path="manage-cars" element={<ManageCar/>}/>
          <Route path="manage-bookings" element={<ManageBooking/>}/>
          
        </Route>

       
      </Routes>
    </div>
  );
}

export default App;


