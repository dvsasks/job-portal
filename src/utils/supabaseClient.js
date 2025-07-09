import { createClient } from "@supabase/supabase-js";
export const supebaseurl = import.meta.env.VITE_SUPABASE_URL;
const supabaseClient = async (accessToken) => {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    }
  );
};

export default supabaseClient;
