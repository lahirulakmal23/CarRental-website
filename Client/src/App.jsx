import RequireRole from "./components/RequireRole";
import CustomerProfile from "./pages/CustomerProfile";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import AllCars from "./pages/Cars";
import Mybooking from "./pages/Mybooking";
import Layout from "./pages/owner/Layout";
import Dashbord from "./pages/owner/Dashborad"
import ManageCar from "./pages/owner/ManageCar";
import ManageBooking from "./pages/owner/ManageBooking";
import AddCar from "./pages/owner/AddCar";
import MyProfile from "./pages/owner/MyProfile";
import Inquiries from "./pages/owner/Inquiries";
import Login from "./components/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(() => !!sessionStorage.getItem("token"));
  const [sessionError, setSessionError] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    const controller = new AbortController();
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");
    const verify = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal });
        if (response.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          return;
        }
        const result = await response.json();
        if (!response.ok || !result.success || !result.data?.role) throw new Error("verification failed");
        if (!controller.signal.aborted) {
          setUser(result.data);
          sessionStorage.setItem("user", JSON.stringify(result.data));
        }
      } catch {
        if (!controller.signal.aborted) setSessionError("Unable to verify your account. Check the server connection and try again.");
      } finally {
        if (!controller.signal.aborted) setChecking(false);
      }
    };
    verify();
    return () => controller.abort();
  }, []);
  const onLogin = (account) => { setUser(account); setChecking(false); setSessionError(""); };
  const guard = (children, role) => <RequireRole user={user} checking={checking} error={sessionError} role={role}>{children}</RequireRole>;
  const navigate = useNavigate();
  const location = useLocation();
  const authMode = location.state?.authMode === "register" ? "register" : "login";
  const setShowLogin = (mode) => {
    if (!mode) { navigate("/", { replace: true }); return; }
    navigate("/login", { state: { authMode: mode === "register" ? "register" : "login" } });
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setSessionError("");
    setChecking(false);
    navigate("/login", { replace: true, state: { authMode: "login" } });
  };
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <div className="App">

      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} user={user} onLogout={logout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails user={user} setShowLogin={setShowLogin} checking={checking} />} />
        <Route path="/cars" element={<AllCars />} />
        <Route path="/my-bookings" element={guard(<Mybooking user={user} />, "customer")} />
        <Route path="/my-profile" element={guard(<CustomerProfile user={user} />)} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/login" element={<><Home /><Login key={authMode} initialState={authMode} onLogin={onLogin} setShowLogin={setShowLogin} /></>} />
        

        <Route path="/owner" element={guard(<Layout user={user} onLogout={logout}/>, "owner")}>
          <Route index element={<Dashbord/>}/>
          <Route path="profile" element={<MyProfile user={user || undefined}/>}/>
          <Route path="inquiries" element={<Inquiries/>}/>
          <Route path="add-car" element={<AddCar/>}/>
          <Route path="manage-cars" element={<ManageCar/>}/>
          <Route path="manage-bookings" element={<ManageBooking/>}/>
          
        </Route>

       
      </Routes>
    </div>
  );
}

export default App;


