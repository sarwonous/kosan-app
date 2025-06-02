"use client";
import { useGetInvoicesQuery } from "@/services/dashboard";
import currency from "currency.js";
import Skeleton from "react-loading-skeleton";

const Invoices = () => {
  const { data, isFetching } = useGetInvoicesQuery({});

  return (
    <>
      {isFetching && (
        <div className="flex items-center gap-4 bg-base px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div
              className="flex items-center justify-center shrink-0 size-12"
              data-icon="Receipt"
              data-size="24px"
              data-weight="regular"
            >
              <Skeleton width={48} height={48} />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <p className="text-[var(--secondary-text)] text-base font-medium leading-normal line-clamp-1">
                <Skeleton width={"100%"} />
              </p>
              <p className="text-[var(--primary)] text-sm font-normal leading-normal line-clamp-2">
                <Skeleton />
              </p>
            </div>
          </div>
        </div>
      )}
      {!isFetching &&
        data.invoices.map((invoice) => {
          return (
            <div
              key={invoice.id}
              className="flex items-center gap-4 bg-base px-4 min-h-[72px] py-2 justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className="text-[var(--secondary-text)] flex items-center justify-center rounded-lg bg-[var(--secondary)] shrink-0 size-12"
                  data-icon="Receipt"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[var(--secondary-text)] text-base font-medium leading-normal line-clamp-1">
                    {invoice.subscription.name}
                  </p>
                  <p className="text-[var(--primary)] text-sm font-normal leading-normal line-clamp-2">
                    Invoice #{invoice.id}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <p className="text-[var(--secondary-text)] text-base font-normal leading-normal">
                  {currency(invoice.amount, {
                    symbol: "Rp",
                    precision: 0,
                    separator: ".",
                    decimal: "-",
                  }).format()}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Invoices;
