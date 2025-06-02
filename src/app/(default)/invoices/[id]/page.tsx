const InvoiceDetailPage = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-base justify-between group/design-root overflow-x-hidden">
      <div>
        <div className="flex items-center bg-base p-4 pb-2 justify-between">
          <div
            className="text-[var(--secondary-text)] flex size-12 shrink-0 items-center"
            data-icon="ArrowLeft"
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
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-[var(--secondary-text)] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Payment Details
          </h2>
        </div>
        <h2 className="text-[var(--secondary-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Scan to Pay
        </h2>
        <div className="flex w-full grow bg-base @container p-4">
          <div className="w-full gap-1 overflow-hidden bg-base @[480px]:gap-2 aspect-[3/2] rounded-xl flex">
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFjDU5tAA2swnLy9u1BsyE62wGljGxqpPFBaVZm_5LzwNXaQ7VIYBCt0n7cHvVKWOkGA9RmaQqQOGuqcbFoEfHnyEBvViie3sbhq896-mbIbx7D8WPrnanVif1Wtr42fsIyDIL53-CKyWoCSjyzyWQjr3uFsX7G0OCVu6goxUsd13owUvPfHwxJWGI3E0nKEtb4ZSF7nON31YIkPKCVdeus2D9NSE7yFwCq3L1zZm1gsgY5lwscwxMsiKHf5SSXL3opsvJonOi-v4")`,
              }}
            ></div>
          </div>
        </div>
        <h2 className="text-[var(--secondary-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Invoice Details
        </h2>
        <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[var(--secondary-border)] py-5">
            <p className="text-[var(--primary)] text-sm font-normal leading-normal">
              Invoice Number
            </p>
            <p className="text-[var(--secondary-text)] text-sm font-normal leading-normal">
              INV-2023-0012
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[var(--secondary-border)] py-5">
            <p className="text-[var(--primary)] text-sm font-normal leading-normal">
              Amount Due
            </p>
            <p className="text-[var(--secondary-text)] text-sm font-normal leading-normal">
              $500.00
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[var(--secondary-border)] py-5">
            <p className="text-[var(--primary)] text-sm font-normal leading-normal">
              Due Date
            </p>
            <p className="text-[var(--secondary-text)] text-sm font-normal leading-normal">
              2023-12-31
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[var(--secondary-border)] py-5">
            <p className="text-[var(--primary)] text-sm font-normal leading-normal">
              Payment Method
            </p>
            <p className="text-[var(--secondary-text)] text-sm font-normal leading-normal">
              Credit Card
            </p>
          </div>
        </div>
        <h2 className="text-[var(--secondary-text)] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Upload Payment Proof
        </h2>
        <div className="flex flex-col p-4">
          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[var(--secondary-border)] px-6 py-14">
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-[var(--secondary-text)] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                Upload File
              </p>
              <p className="text-[var(--secondary-text)] text-sm font-normal leading-normal max-w-[480px] text-center">
                Drag and drop or browse to upload your payment proof.
              </p>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[var(--secondary)] text-[var(--secondary-text)] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Browse Files</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex px-4 py-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-[var(--primary)] text-[var(--primary-text)] font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Submit</span>
          </button>
        </div>
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <p className="text-[var(--primary)] text-base font-normal leading-normal">
            © 2024 InvoicePro. All rights reserved.
          </p>
        </footer>
        <div className="h-5 bg-base"></div>
      </div>
    </div>
  );
};
export default InvoiceDetailPage;
