import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.js";
// import Register from "./Components/Register.js";
import Encrypt from "./Components/Encrypt.js";
import Decrypt from "../src/Components/Decrypt.js";
import Navbar from "./Components/Navbar.js";
import "./Components/style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/decrypt" element={<Decrypt />} />
      </Routes>
    </Router>
  );
}

export default App;
