import HomePage from "./HomePage";
import JobCategoryPage from "./JobCategoryPage"
import JobDetailsPage from "./JobDetailsPage";
import JobListingsPage from "./JobListingsPage";

const JobSearchApp = () => {
  return (
    <section>
      <HomePage />
      <JobCategoryPage />
      <JobListingsPage />
      <JobDetailsPage />
    </section>
  );
};
export default JobSearchApp;
