import { useGetUserProfileQuery } from "@/services/user";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
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
    <div className="flex p-4 @container">
      <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
            style={{
              backgroundImage: `url("${avatarUrl}")`,
            }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[var(--secondary-text)] text-[22px] font-bold leading-tight tracking-[-0.015em]">
              {isLoading ? (
                <Skeleton width={120} height={24} />
              ) : (
                user?.profile.name || "User Name"
              )}
            </p>
            <p className="text-[var(--primary)] text-base font-normal leading-normal">
              {isLoading ? <Skeleton width={80} /> : user?.profile.email || ""}
            </p>
            <p className="text-[var(--primary)] text-base font-normal leading-normal">
              {isLoading ? (
                <Skeleton width={80} />
              ) : user?.profile.created_at ? (
                new Date(user.profile.created_at).toLocaleDateString()
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
