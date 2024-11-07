import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const JobCategoryPage = () => {
  const location = useLocation();
  const { country } = location.state || {};
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.adzuna.com/v1/api";
  const API_KEY = "8c3fa43c6e834b72327f6b0d5d5b7b7f";
  const APP_ID = "288e942a";

  const fetchCategories = async (country) => {
    try {
      setLoading(true)
      let url = `${BASE_URL}/jobs/${country}/categories?app_id=${APP_ID}&app_key=${API_KEY}`;
      
     
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.results || []);  // Use 'results' based on your response structure
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load job categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (country) {

      fetchCategories(country);
    }
  }, [country]);

  return (
    <section className="container">
      <h2>
        Job Categories for{" "}
        {country === "za"
          ? "South Africa"
          : country === "gb"
          ? "Great Britain"
          : country}
        :
      </h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : categories.length === 0 ? (
        <p>No job categories available.</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <h3>{category.label}</h3>
              <Link
                to="/JobListingsPage"
                state={{ country, category }}
              >
                Select
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobCategoryPage;

