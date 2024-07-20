import type { RootState } from "../App/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalDataType = {
    isLoading: boolean;
    errorMessage: string;
    notification: string;
};

const initialState: GlobalDataType = {
    isLoading: false,
    errorMessage: "",
    notification: "",
};

export const globalActions = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        setIsLoading: (state: GlobalDataType, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: GlobalDataType, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setNotification: (state: GlobalDataType, action: PayloadAction<string>) => {
            state.notification = action.payload;
        },
    },
});

export const { setNotification, setIsLoading, setError } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;
