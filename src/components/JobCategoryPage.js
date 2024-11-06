import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const JobCategoryPage = () => {
  const location = useLocation();
  const { country, jobType } = location.state || {};
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.adzuna.com/v1/api";
  const API_KEY = "8c3fa43c6e834b72327f6b0d5d5b7b7f";
  const APP_ID = "288e942a";

  const fetchCategories = async (country) => {
    try {
      const url = `${BASE_URL}/jobs/${country}/categories?app_id=${APP_ID}&app_key=${API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.categories || []);
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
    <section>
      <h2>Job Categories for {country}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : categories.length === 0 ? (
        <p>No job categories available.</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <h3>{category.label}</h3>
              <p>{category.tag}</p>
              <Link
                to="/JobListingsPage"
                state={{ country, jobType, category }}
              >
                Select
              </Link>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .category-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          background-color: #f9f9f9;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .error {
          color: red;
        }
      `}</style>
    </section>
  );
};

export default JobCategoryPage;
