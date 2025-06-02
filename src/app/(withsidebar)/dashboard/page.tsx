"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import toast from 'react-hot-toast';
import Link from "next/link";

interface Subscription {
  id: string;
  name: string;
  status: string;
  price: number;
  start_date: string;
  type: string;
  created_at: string;
}

interface Invoice {
  id: string;
  subscription_id: string;
  amount: number;
  due_date: string;
  status: string;
  document: string;
  created_at: string;
  subscription: Subscription;
}

const DashboardPage = () => {
  useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = async (signal): Promise<Invoice[]> => {
    try {
      const response = await fetch("/api/protected/invoices", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: signal,
      });
      if (response.ok) {
        const data = await response.json();
        return data.invoices || [];
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch invoices");
      }
    } catch (err) {
      // if aborted, do not throw an error
      console.log()

      throw new Error("Error fetching invoices: " + err.message);
    }
  };

  const fetchOutstandingBalance = async (signal): Promise<{ outstandingInvoices: Invoice[], amoutOutstanding: number }> => {
    try {
      const response = await fetch("/api/protected/user/outstanding", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: signal,
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch outstanding balance");
      }
    } catch (err) {
      throw new Error("Error fetching outstanding balance: " + err.message);
    }
  };

  const fetchSubscriptions = async (signal): Promise<Subscription[]> => {
    try {
      const response = await fetch("/api/protected/subscriptions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: signal,
      });
      if (response.ok) {
        const data = await response.json();
        return data.subscriptions || [];
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch subscriptions");
      }
    } catch (error) {
      throw new Error("Error fetching subscriptions: " + error.message);
    }
  };

  useEffect(() => {
    const abortInvoices = new AbortController();
    const abortOutstanding = new AbortController();
    const abortSubscriptions = new AbortController();
    setIsLoading(true);
    Promise.all([
      fetchInvoices(abortInvoices.signal),
      fetchOutstandingBalance(abortOutstanding.signal),
      fetchSubscriptions(abortSubscriptions.signal)
    ]).then((resp) => {
      const [invoices, totalOutstanding, subscriptions] = resp;
      setInvoices(invoices || []);
      setTotalOutstanding(totalOutstanding.amoutOutstanding || 0);
      setSubscriptions(subscriptions || []);
      setIsLoading(false);
    }).catch((err) => {
      if (err && err.message && err.message !== '') {
        console.error("Error fetching data:", err.message);
        toast.error("An error occurred while fetching data X. \n " + err.message);
      }
      setIsLoading(false);
    });
    return () => {
      abortInvoices.abort('Component unmounted, aborting fetch');
      abortOutstanding.abort('Component unmounted, aborting fetch');
      abortSubscriptions.abort('Component unmounted, aborting fetch');
    };
  }, []);

  return (
    <div className="p-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Subscriptions
          </h3>
          <p className="text-2xl font-bold">{subscriptions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Active Subscriptions
          </h3>
          <p className="text-2xl font-bold">
            {subscriptions.filter((sub) => sub.status === "active").length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-6">
          <h3 className="text-red-500 text-sm font-medium">
            Outstanding Payments
          </h3>
          <p className="text-2xl font-bold text-red-600">
            ${totalOutstanding.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Outstanding Invoices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.subscription.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === "unpaid"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-4 justify-end items-center">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                        title="View Invoice"
                      >
                        View Invoice
                      </Link>
                      {/* pay button */}
                      {invoice.status === "unpaid" && (
                        <Link
                          href={`/invoices/${invoice.id}/pay`}
                          className="btn btn-primary"
                          title="Pay Invoice"
                        >
                          Pay Now
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No outstanding invoices found
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Subscriptions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscription.status === "active"
                          ? "bg-green-100 text-green-800"
                          : subscription.status === "unpaid"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${subscription.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscription.start_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {subscriptions.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No subscriptions found
                  </td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
