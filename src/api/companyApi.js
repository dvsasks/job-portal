import supabaseClient from "@/utils/supabaseClient";

export const getCompanies = async (token) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
};
