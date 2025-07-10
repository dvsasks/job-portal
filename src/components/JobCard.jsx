import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, Loader, MapPin } from "lucide-react";
import useApi from "@/hooks/useApi";
import { saveJob } from "@/api/jobApi";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job, saveinit = false, isMyJob }) => {
  const [saved, setSaved] = useState(saveinit);
  const { isLoading, errors, fn: saveJobFn, data } = useApi(saveJob);
  const navigate = useNavigate();
  function handleSaveJob(jobId, saved) {
    const result = saveJobFn({ jobId, saved });
    setSaved(!saved);
  }

  return (
    <Card className="bg-[#02021c] hover:shadow-gray-600">
      <CardHeader className="border-b-1 pb-1">
        <CardTitle className="text-xl">{job.title}</CardTitle>
        <div className="flex  justify-between pt-2 pb-1 text-sm">
          {" "}
          <img className="h-4" src={job?.company?.logo} />
          <div className="flex justify-around ">
            <MapPin size={15} />
            <span className="h-4 text-xs">{job.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p>{job.description?.substring(0, job.description.indexOf("."))}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between xl:justify-start items-center w-full gap-4">
          <Button
            className=" flex-1 max-w-54 text-white bg-gray-800 h-8 hover:bg-gray-700"
            onClick={() => {
              navigate(`/job/${job.job_id}`);
            }}
          >
            {" "}
            More Details
          </Button>

          <Button
            onClick={() => handleSaveJob(job.job_id, saved)}
            variant="outline"
          >
            {saved ? (
              <Heart size={18} stroke="red" fill="red" />
            ) : (
              <Heart size={18} stroke="red" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
