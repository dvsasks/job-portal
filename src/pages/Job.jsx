import { getJob } from "@/api/jobApi";
import ApplyJobDrawer from "@/components/ApplyJobDrawer";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useApi from "@/hooks/useApi";
import { useSession, useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { BoxIcon, Briefcase, DoorOpen, MapPin } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { id } = useParams();
  const { isLoaded } = useSession();

  const {
    data: job,
    error,
    fn: fnGetJob,
    isLoading: isDataLoading,
  } = useApi(getJob);

  useEffect(() => {
    if (isLoaded && id) {
      fnGetJob({ jobId: parseInt(id) }); // ✅ Only run when Clerk is ready
    }
  }, [isLoaded, id]);
  useEffect(() => {
    console.log(job);
  }, [job]);
  if (error) {
    return (
      <div className="text-red-500">Failed to load job: {error.message}</div>
    );
  }

  const jobData = Array.isArray(job) ? job[0] : job; // use maybeSingle to avoid this
  const { user } = useUser(); // ✅ Always call this at the top
  const hasApplied = jobData?.applications?.some(
    (app) => app.user_id === user?.user_id
  );
  if (!isLoaded || isDataLoading) {
    return <BarLoader width="100%" color="green" />;
  }

  return (
    <div className="p-4 bg-transperant rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">{jobData?.title}</h1>
        <img src={jobData?.company?.logo} alt="Company Logo" className="h-8" />
      </div>
      <div className="flex justify-between px-4 mb-6">
        <span className="text-sm  text-gray-400 flex gap-1 items-center">
          <MapPin size={16} />
          {jobData?.location}
        </span>
        <span className="text-sm  text-gray-400 flex gap-1 items-center">
          <Briefcase size={16} />
          {jobData?.applications?.length} Applications
        </span>
        <span className="text-sm  text-gray-400 flex gap-1 items-center">
          <DoorOpen />
          {jobData?.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-4">About the job</h3>
      <p className=" text-sm ">{jobData?.description}</p>
      <h3 className="text-xl font-bold my-4">What we are looking for</h3>
      <div className="text-sm my-4 ">
        {
          <MDEditor.Markdown
            className="markdown-content"
            style={{ background: "transparent" }}
            source={jobData?.requirements}
          />
        }
      </div>

      {user?.unsafeMetadata.role !== "recruiter" && (
        <ApplyJobDrawer
          job={jobData}
          user={user}
          variant="blue"
          className="w-full"
          applied={hasApplied}
          fnGetJob={fnGetJob}
        />
      )}
    </div>
  );
};

export default Job;
