import { configureStore } from "@reduxjs/toolkit";
import dashboard from "@/services/dashboard";
import user from "@/services/user";
export const makeStore = () => {
    return configureStore({
        reducer: {
            dashboard: dashboard.reducer,
            user: user.reducer,
            // Add your reducers here
        },
        devTools: process.env.NODE_ENV !== "production",
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat([dashboard.middleware, user.middleware]),
        
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;