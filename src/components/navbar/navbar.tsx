import { useGetUserProfileQuery } from "@/services/user";
import { useMemo } from "react";

const Navbar = () => {
  const { data: user, isLoading } = useGetUserProfileQuery();
  const avatarUrl = useMemo(() => {
    return user?.profile?.avatar
      ? `https://www.gravatar.com/avatar/${user?.profile?.avatar}`
      : "https://www.gravatar.com/avatar/" +
          (user?.profile?.email
            ? user?.profile?.email.trim().toLowerCase()
            : "");
  }, [user?.profile?.avatar, user?.profile?.email]);

  return (
    <div className="flex items-center bg-base p-4 pb-2 justify-between">
      <div className="flex size-12 shrink-0 items-center">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
          style={{
            backgroundImage: `url("${avatarUrl}")`,
          }}
        ></div>
      </div>
      <h2 className="text-[var(--secondary-text)] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
        Dashboard
      </h2>
    </div>
  );
};
export default Navbar;
