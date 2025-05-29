import React from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">Finance Tracker</div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/accounts"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Accounts
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
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
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen">{children}</main>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AuthenticatedLayout;
