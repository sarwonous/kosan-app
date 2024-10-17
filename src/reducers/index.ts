import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";



interface AppConfig {
    title: string;
}

interface AppState {
    app: AppConfig;
}

const initialState: AppState = {
    app: {
        title: "Koskou",
    },
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.app.title = action.payload
        },
    },
});

const rootReducer = combineReducers({
    app: appSlice.reducer,
});

export const { setTitle } = appSlice.actions;
export default rootReducer;