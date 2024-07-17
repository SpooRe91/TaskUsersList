import type { RootState } from "../App/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAction } from "../types";

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
        setIsLoading: (state: GlobalDataType, action: IAction<string, boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: GlobalDataType, action: IAction<string, string>) => {
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
