import React from "react";
import { Link, useLocation } from "react-router-dom";

const JobTypePage = () => {
  const location = useLocation();
  const { country } = location.state || {};

  return (
    <section>
      <h2>Select Job Type</h2>

      <Link to="/JobCategoryPage" state={{ country, jobType: "Full-Time" }}>
        <button>Full-Time Job</button>
      </Link>
      <Link to="/JobCategoryPage" state={{ country, jobType: "Part-Time" }}>
        <button>Part-Time Job</button>
      </Link>
    </section>
  );
};

export default JobTypePage;
