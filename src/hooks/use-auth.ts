import { useLoginMutation, useMeQuery } from "@/api/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface useAuthParams {
  loggedIn: boolean;
  token: string;
  skipMe?: boolean;
}

const useAuth = (props?: useAuthParams) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, isUninitialized, data } = useMeQuery(
    props?.token ?? "",
    {
      skip: props?.skipMe ?? false,
    }
  );

  useEffect(() => {
    if (
      (!isUninitialized && !isLoading && !isSuccess) ||
      (!isUninitialized && isError)
    ) {
      navigate("/");
    }
  }, [isLoading, isSuccess, navigate, isUninitialized, isError]);

  return {
    login,
    user: {
      ...data,
      isLoading,
      isSuccess,
      isError,
    },
    // logout,
  };
};

export default useAuth;
