import React from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const Sidebar = () => {
  return (
    <div className="bg-[#1a237e] text-white w-full md:w-64 min-h-[60px] md:min-h-screen p-4">
      <div className="text-2xl font-bold mb-2 md:mb-8 text-center">Finance Tracker</div>
      <nav className="flex md:block overflow-x-auto whitespace-nowrap md:whitespace-normal">
        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-[#283593] transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/accounts"
              className="block py-2 px-4 rounded hover:bg-[#283593] transition-colors"
            >
              Accounts
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="block py-2 px-4 rounded hover:bg-[#283593] transition-colors"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className="block py-2 px-4 rounded hover:bg-[#283593] transition-colors"
            >
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const AuthenticatedLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AuthenticatedLayout;