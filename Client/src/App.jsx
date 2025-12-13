import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");

  return (
    <div className="App">
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    </div>
  );
}

export default App;
