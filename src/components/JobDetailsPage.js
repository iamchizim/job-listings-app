import React from "react";
import { useLocation } from "react-router-dom";
const JobDetailsPage = () => {
  const location = useLocation();
  const job = location.state || {};

  if (!job) {
    return <div>No Job Found</div>;
  }

  return (
    <section>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p>{job.created}</p>
    </section>
  );
};
export default JobDetailsPage;
