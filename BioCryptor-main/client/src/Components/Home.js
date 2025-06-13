import React from "react";

function Home() {
  return (
    <div className="container">
      <section className="hero-section">
        <h1>Welcome to BioCryptor</h1>
        <p>
          A blockchain-based platform for biometric-secured data encryption and
          decryption.
        </p>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "/register")}
        >
          Get Started
        </button>
      </section>
      <section className="features">
        <div className="feature-card">
          <h3>Secure Registration</h3>
          <p>
            Register with biometric data and custom attributes for
            identity-based encryption.
          </p>
        </div>
        <div className="feature-card">
          <h3>Data Encryption</h3>
          <p>
            Encrypt sensitive data with fine-grained access control policies.
          </p>
        </div>
        <div className="feature-card">
          <h3>Data Decryption</h3>
          <p>Decrypt data securely using authorized access attributes.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
