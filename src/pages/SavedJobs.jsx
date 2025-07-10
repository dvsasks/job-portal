import { getSavedJobs } from "@/api/jobApi";
import JobCard from "@/components/JobCard";
import useApi from "@/hooks/useApi";
import { useUser } from "@clerk/clerk-react";

import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { user, isLoaded } = useUser();
  const {
    isLoading: isJobLoading,
    errors,
    fn: fetchSavedJobs,
    data: savedJobs,
  } = useApi(getSavedJobs);
  useEffect(() => {
    if (user && isLoaded) {
      fetchSavedJobs({ userId: user.id });
    }
  }, [isLoaded, user]);
  if (!isLoaded || isJobLoading)
    return <BarLoader color="green" width="100%" />;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3  gap-4 p-4">
        {savedJobs.map(({ job }) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;
