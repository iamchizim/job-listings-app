import React from "react";
import { useLocation } from "react-router-dom";

const JobDetailsPage = () => {
  const location = useLocation();
  const job = location.state?.job 


  if (!job) {
    return <div>No Job Found</div>;
  }

  return (
    <section className="container">
      <h3>Job Title: {job.title}</h3>
      <p>Description: {job.description}</p>
      <p>Time Created: {job.created}</p>
    </section>
  );
};
export default JobDetailsPage;
