import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = parseFloat(localStorage.getItem("expiresAt")) * 1000;

    if (!token || !expiresAt || new Date(expiresAt) <= new Date()) {
      router.push("/login");
    }
  }, [router]);
};

export default useAuth;
