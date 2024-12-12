import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../helper/baseUrl";

const useCurrentUser = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${baseUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      return res.json();
    },
    enabled: !!localStorage.getItem("token"),
  });

  const user = data?.data;
  return { user, isLoading, isError, error, refetch };
};

export default useCurrentUser;
