import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface DefaultResponse {
    status: string;
    code: number;
    message: any;
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
        uploadReceipt: builder.mutation<DefaultResponse,IUploadReceipt>({
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
            invalidatesTags: ["Payment"]
        }),
    }),
});

export const { useUploadReceiptMutation } = paymentApi;
export default paymentApi;