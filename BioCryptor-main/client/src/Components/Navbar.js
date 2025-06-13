import React, { useState } from "react";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        BioCryptor
      </a>
      <div className={`navbar-menu ${menuActive ? "active" : ""}`}>
        <a href="/encrypt">Encrypt</a>
        <a href="/decrypt">Decrypt</a>
      </div>
      <span className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </span>
    </nav>
  );
}

export default Navbar;
