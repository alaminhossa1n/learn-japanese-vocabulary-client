import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../helper/baseUrl";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const {
    mutate: login,
    isLoading,
    isError,
    isSuccess,
    data: token,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(`${baseUrl}/user/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  return { login, isLoading, isError, isSuccess, token, error };
};

export default useLogin;
