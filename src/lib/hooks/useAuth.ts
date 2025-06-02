import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = parseFloat(localStorage.getItem("expiresAt")) * 1000;
    if (pathname !== "/login" && pathname !== "/register") {
      if (!token || !expiresAt || new Date(expiresAt) <= new Date()) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }
  }, [router, pathname]);

  return { isLoading }
};

export default useAuth;
