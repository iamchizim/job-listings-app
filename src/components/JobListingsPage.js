import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const JobListingsPage = () => {
  const location = useLocation();
  const { country, jobType, category } = location.state || {};
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.adzuna.com/v1/api";
  const API_KEY = "8c3fa43c6e834b72327f6b0d5d5b7b7f";
  const APP_ID = "288e942a";

  const fetchJobListings = async (country, page, filters) => {
    const { jobType, category } = filters || {};
    let url = `${BASE_URL}/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}`;

    if (jobType) url += `&contract_type=${jobType}`;
    if (category) url += `&category=${category}`;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No Job Listings Found");
      }
      const data = await response.json();
      setJobListings(data.result || []);
    } catch (error) {
        setError("Failed to load job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if ((country, page, filters)) {
      fetchJobListings(country, page, filters);
    }
  }, [country, page, filters]);

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : jobListings.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <Link to={`/JobDetails/${job.id}`} state={{ job }}>
            Read More
          </Link>
        </div>
      ))}
    </section>
  );
};
export default JobListingsPage;
