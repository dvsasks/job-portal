import { useAuth, useSession, useUser } from "@clerk/clerk-react";
import { useContext, useEffect, useMemo, useState } from "react";
import supabaseClient from "@/utils/supabaseClient";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { getJobs } from "@/api/jobApi";
import { City, State } from "country-state-city";

import { Heart, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCompanies } from "@/api/companyApi";
import JobCard from "@/components/JobCard";
import { Navigate, useNavigate } from "react-router-dom";

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const { isLoaded, session } = useSession();

  const [searchTerm, setSearchTerm] = useState("");
  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Indore",
    "Bhopal",
    "Nagpur",
    "Visakhapatnam",
    "Vijayawada",
    "Surat",
    "Coimbatore",
    "Noida",
    "Gurgaon",
    "Chandigarh",
    "Mysuru",
    "Thiruvananthapuram",
  ];

  const {
    data: jobs,
    errors,
    fn: fetchJobs,
    isLoading: isJobsLoading,
  } = useApi(getJobs);

  const {
    data: companies,
    errors: companyError,
    fn: fetchCompanies,
    isLoading: isCompaniesLoading,
  } = useApi(getCompanies);
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded) {
      fetchJobs({ searchQuery, location, companyId: company });
    }
  }, [isLoaded, searchQuery, location, company]);

  useEffect(() => {
    if (isLoaded) {
      fetchCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("jobs", jobs);
  }, [jobs]);
  if (!isLoaded || isJobsLoading)
    return <BarLoader width="100%" color="green" />;
  if (user?.unsafeMetadata.role === "recruiter") {
    navigate("/");
    return;
  }
  return (
    <div>
      <div className="flex flex-col px-3 gap-2 py-6">
        <div className="w-full">
          <h1 className="text-center text-4xl font-bold mb-8">Latest Jobs</h1>
        </div>
        <div className="flex justify-between gap-2">
          {" "}
          <Input
            className="bg-[#02021c]"
            type="text"
            placeholder="Search with title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="blue"
            className="w-1/6"
            onClick={(e) => {
              setSearchQuery(searchTerm);
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center ">
          {/* Filters (stretch to fill available space) */}
          <div className="flex flex-1 gap-2">
            {/* Location Select */}
            <Select
              className="flex-1"
              value={location}
              onValueChange={(value) => setLocation(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Find by location" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Company Select */}
            <Select
              className="flex-1"
              value={company}
              onValueChange={(value) => setCompany(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Find by company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.name} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Small Clear Button */}
          <Button
            variant="destructive"
            className="px-3 py-1 text-sm h-9 w-1/6"
            onClick={() => {
              setSearchQuery("");
              setSearchTerm("");
              setLocation("");
              setCompany("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} saveinit={job.saved?.length > 0} />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
