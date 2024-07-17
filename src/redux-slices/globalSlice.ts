import type { RootState } from "../App/store";
import { createSlice } from "@reduxjs/toolkit";
import { IAction } from "../types";

type GlobalDataType = {
    isLoading: boolean;
    errorMessage: string;
};

const initialState: GlobalDataType = {
    isLoading: false,
    errorMessage: "",
};

export const globalActions = createSlice({
    name: "globalSlice",
    initialState,
    reducers: {
        setIsLoading: (state: GlobalDataType, action: IAction<string, boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state: GlobalDataType, action: IAction<string, string>) => {
            console.log(action.payload)
            state.errorMessage = action.payload;
        },
    },
});

export const { setIsLoading, setError } = globalActions.actions;
export const globalState = (state: RootState) => state.globalSlice;
export default globalActions.reducer;
