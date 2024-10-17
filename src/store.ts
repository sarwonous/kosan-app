import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import authApi from "./api/auth";
import invoiceApi from "./api/invoice";
import paymentApi from "./api/payment";

const store = configureStore({
    reducer: {
        ...rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [invoiceApi.reducerPath]: invoiceApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, invoiceApi.middleware, paymentApi.middleware]),
    devTools: true
});


export default store;
