import supabaseClient from "@/utils/supabaseClient";

export const getJobs = async (
  token,
  { searchQuery = "", location = "", companyId = "" } = {}
) => {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "* , saved:saved_applications(id,job_id), company:companies(name,logo)"
    );

  if (location) query = query.eq("location", location);
  if (companyId) query = query.eq("company_id", companyId);
  if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};
export const getJob = async (token, { jobId = "" } = {}) => {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase
    .from("jobs")
    .select(
      "* , applications:applications(id,candidate_id), company:companies(name,logo)"
    )
    .eq("job_id", jobId);

  console.log("error", error);

  if (error) throw new Error(error.message);
  return data;
};
export const saveJob = async (token, { saved, jobId }) => {
  const supabase = await supabaseClient(token);
  let data = null;
  let error = null;
  console.log("before call saved=" + saved + " jobId=" + jobId);
  if (!saved) {
    const result = await supabase
      .from("saved_applications")
      .insert({ job_id: jobId })
      .select();
    data = result.data;
    error = result.error;
    console.log("inside if " + result);
  } else {
    const result = await supabase
      .from("saved_applications")
      .delete()
      .eq("job_id", jobId);
    data = result.data;
    error = result.error;
    console.log("inside else " + result);
  }

  console.log("after call data=" + data + " error=" + error);
  if (error) throw new Error(error.message);
  return data;
};
export async function getSavedJobs(token, { userId }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_applications")
    .select("job:jobs(*)")
    .eq("user_id", userId);
  console.log(error);
  console.log(data);
  if (error) throw new Error("error occured while fetching saved jobs ");
  return data;
}

const createJob = async () => {
  if (!session) return; // wait for session to load
  setIsLoading(true);
  try {
    const token = await getToken({ template: "supabase" });
    if (!token) {
      console.warn("No token received");
      return;
    }
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase.from("jobs").insert({
      title: "Full Stack Developer",
      company_id: "2",
      description: "Some description here...",
      location: "Hyderabad",
    });
    if (error) {
      console.error("Error inserting job:", error);
      return;
    }
    // Refetch jobs after creating a new one
    fetchJobs();
  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    setIsLoading(false);
  }
};
