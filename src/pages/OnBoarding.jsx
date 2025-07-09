import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  async function handleOnClick(type) {
    await user.update({
      unsafeMetadata: {
        role: type,
      },
    });
    navigate("/");
  }
  useEffect(() => {
    user?.unsafeMetadata?.role === "recruiter" && navigate("/post-job");
    user?.unsafeMetadata?.role === "candidate" && navigate("/job-list");
  }, [user, navigate]);
  if (!isLoaded) return <BarLoader />;

  return (
    <div className="flex flex-col justify-center items-center pt-24">
      <h1 className="text-6xl">I am</h1>
      <div className="flex gap-8 mt-8">
        <Button
          variant="blue"
          size="lg"
          className="h-12 text-2xl"
          onClick={() => handleOnClick("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          size="lg"
          className="h-12 text-2xl"
          onClick={() => handleOnClick("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;
