import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

export default function useApi(callBack) {
  const { session } = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const fn = async (options = {}, ...args) => {
    if (!session) return;
    setIsLoading(true);
    setErrors("");
    try {
      const token = await session.getToken({ template: "supabase" });
      if (!token) {
        setErrors("No token received");
        return;
      }
      const result = await callBack(token, options, ...args);

      setData(result);
      setIsLoading(false);
    } catch (error) {
      setErrors(error.message, "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, errors, fn, data };
}
