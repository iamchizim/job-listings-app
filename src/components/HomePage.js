import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [country, setCountry] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <section>
      <h1>Job Listings App</h1>
      <p>Select your country to get started:</p>

      <select
        id="country-select"
        value={country}
        onChange={handleCountryChange}
      >
        <option value="" disabled>
          -- Select Country --
        </option>
        <option value="gb">Great Britain</option>
        <option value="za">South Africa</option>
      </select>

      <br />

      <Link
        to="/JobTypePage"
        state={{ country }}
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "10px 20px",
          textDecoration: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          cursor: country ? "pointer" : "not-allowed",
          opacity: country ? 1 : 0.5,
        }}
      >
        Next
      </Link>
    </section>
  );
};

export default HomePage;