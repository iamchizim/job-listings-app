import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const JobListingsPage = () => {
  const location = useLocation();
  const { country, category } = location.state || {};
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const BASE_URL = "https://api.adzuna.com/v1/api";
  const API_KEY = "8c3fa43c6e834b72327f6b0d5d5b7b7f";
  const APP_ID = "288e942a";
console.log(category)
// Ensure 'category' is a string
const categoryString = typeof category === 'object' && category?.tag ? category.tag : category;


  const fetchJobListings = async () => {
    let url = `${BASE_URL}/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${API_KEY}`;
    if (categoryString) {
      url += `&category=${encodeURIComponent(categoryString)}`;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No job listings found.");
      }
      const data = await response.json();
      console.log("API Response: ", data);
      setJobListings(data.results || []);
    } catch (error) {
      setError("Failed to load job listings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (country && category) {
      fetchJobListings();
    }
  }, [country, category, page]);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="job-listings">
            {jobListings.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                {console.log(job)}
                <Link to={`/JobDetailsPage/${job.id}`} state={{ job }}>
                  Read More
                </Link>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      )}
    </section>
  );
};

export default JobListingsPage;
