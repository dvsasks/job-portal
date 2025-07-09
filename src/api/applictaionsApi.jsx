import supabaseClient from "@/utils/supabaseClient";

import { supebaseurl } from "@/utils/supabaseClient";

export const applyToJob = async (token, formData) => {
  const supabase = await supabaseClient(token);
  //   const random = Math.floor(Math.random() * 90000);
  //   const filePath = `resumes/resume_${random}_${formData.candidate_id}`;
  //   console.log(formData);
  //   const { error: storageError } = await supabase.storage
  //     .from("job-portal")
  //     .insert(filePath, formData?.resume[0])
  //     .select();
  //   console.log(storageError);
  //   if (storageError) throw new Error("error while uploading resume");
  //   const resume = `${supebaseurl}/storage/v1/object/public/resumes/${fileName}`;
  console.log("before api");

  const { data, error: formDataError } = await supabase
    .from("applications")
    .insert([
      {
        ...formData,
      },
    ])
    .select();
  console.log("after api");

  if (formDataError) {
    console.log(formDataError.message);
    throw new Error("error while inserting applying job data ");
  }
  console.log(data);
  return data;
};
