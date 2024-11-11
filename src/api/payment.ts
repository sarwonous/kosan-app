import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface DefaultResponse {
    status: string;
    code: number;
    message: string;
    data: InvoiceState | InvoiceState[] | any;
}

interface InvoiceState {
    id: string;
    [key: string]: any;
}

interface IUploadReceipt {
    body: FormData;
    token: string;
}


const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Payment"],
    endpoints: (builder) => ({
        uploadReceipt: builder.mutation<InvoiceState,IUploadReceipt>({
            query: ({
                body,
                token
            }) => ({
                url: "/payments/confirm",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body,
            }),
            invalidatesTags: ["Payment"],
            transformResponse: (response: DefaultResponse): InvoiceState => {
                return response.data as InvoiceState;
            },
        }),
    }),
});

export const { useUploadReceiptMutation } = paymentApi;
export default paymentApi;