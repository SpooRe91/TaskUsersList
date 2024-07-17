import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../redux-slices/globalSlice";
import taskUserSlice from "../redux-slices/taskUserSlice";

export const store = configureStore({
    reducer: {
        globalSlice: globalSlice,
        taskUserSlice: taskUserSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
