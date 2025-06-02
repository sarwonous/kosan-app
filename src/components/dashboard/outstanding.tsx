"use client";
import { useGetOutstandingBalanceQuery } from "@/services/dashboard";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Skeleton from "react-loading-skeleton";

const Outstanding = () => {
  const { data, isLoading } = useGetOutstandingBalanceQuery({});

  return (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[var(--secondary-border)]">
        <p className="text-[var(--secondary-text)] text-base font-medium leading-normal">
          Active Subscriptions
        </p>
        <p className="text-[var(--secondary-text)] tracking-light text-2xl font-bold leading-tight">
          {isLoading ? (
            <Skeleton width={24} />
          ) : (
            <>{data?.outstandingInvoices?.length}</>
          )}
        </p>
      </div>
      <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[var(--secondary-border)]">
        <p className="text-[var(--secondary-text)] text-base font-medium leading-normal">
          {isLoading ? (
            <Skeleton width={"50%"} />
          ) : data?.outstandingInvoices?.[0]?.due_date ? (
            <>
              {dayjs(data.outstandingInvoices[0].due_date).isBefore(dayjs())
                ? "Overdue Payments"
                : "Outstanding Payments"}
            </>
          ) : (
            "Outstanding Payments"
          )}
        </p>
        <p className="text-[var(--secondary-text)] tracking-light text-2xl font-bold leading-tight">
          {isLoading ? (
            <Skeleton width={24} />
          ) : data.outstandingInvoices[0] ? (
            <>{dayjs(data.outstandingInvoices[0].due_date).fromNow()}</>
          ) : (
            <>No upcoming payments</>
          )}
        </p>
        {isLoading ? (
          <Skeleton height={48} width={"100%"} />
        ) : (
          <button className="button button-primary">
            <span className="truncate">Pay Now</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Outstanding;
