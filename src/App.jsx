import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./Pages/FrontPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Forgot from "./Pages/Forgot";
import Reset from "./Pages/Reset";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="forgot-password" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

