import { Invoice } from "@/types/invoices";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface OutstandingResponse {
  outstandingInvoices: Invoice[];
  amountOutstanding: number;
}

interface InvoicesResponse {
  invoices: Invoice[];
}

export const dashboardApi = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/protected",
  }),
  endpoints: (builder) => ({
    getOutstandingBalance: builder.query<
      OutstandingResponse,
      { }
    >({
      query: ({ }) => {
        return {
          url: "/user/outstanding",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        };
      },
      transformResponse: (response: OutstandingResponse) => {
        return response;
      },
    }),
    getInvoices: builder.query<InvoicesResponse, {  }>({
      query: ({ }) => {
        return {
          url: "/invoices",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        };
      },
      transformResponse: (response: InvoicesResponse) => {
        return response;
      },
    }),
  }),
});

export const { useGetOutstandingBalanceQuery, useGetInvoicesQuery } =
  dashboardApi;

export default dashboardApi;
