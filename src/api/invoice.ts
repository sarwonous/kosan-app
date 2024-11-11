import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DefaultResponse {
    status: string;
    code: number;
    message: string;
    data: InvoiceState | InvoiceState[] | any;
}

interface InvoiceState {
    id: string;
    payments: any[],
    [key: string]: any;
}

const invoiceApi = createApi({
    reducerPath: "invoiceApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Invoice"],
    endpoints: (builder) => ({
        getInvoices: builder.query<InvoiceState[], string>({
            query: (token) => ({
                url: "/invoices/paid",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["Invoice"],
            transformResponse: (response: DefaultResponse): InvoiceState[] => {
                return response.data as InvoiceState[];
            },
        }),
        getNextInvoice: builder.query<InvoiceState, string>({
            query: (token) => ({
                url: "/invoices/next-invoice",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["Invoice"],
            transformResponse: (response: DefaultResponse): InvoiceState => {
                return response.data as InvoiceState;
            },
        }),
        getInvoiceById: builder.query<InvoiceState, { token: string, id: string }>({
            query: ({ token, id }) => ({
                url: `/invoices/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }),
            providesTags: ["Invoice"],
            transformResponse: (response: DefaultResponse): InvoiceState => {
                return response.data as InvoiceState;
            },
        }),
        getBalance: builder.query<InvoiceState, string>({
            query: (token) => ({
                url: "/invoices/balance",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["Invoice"],
            transformResponse: (response: DefaultResponse): InvoiceState => {
                return response.data as InvoiceState;
            },
        })
    })
});

export const { useGetInvoicesQuery, useGetNextInvoiceQuery, useGetBalanceQuery, useGetInvoiceByIdQuery } = invoiceApi;
export default invoiceApi;