import type { RootState } from "../App/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAction } from "../types";

export type TaskUserType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
};

type TaskUserList = {
    userList: TaskUserType[];
};

const initialState: TaskUserList = {
    userList: [],
};

export const taskUserActions = createSlice({
    name: "taskUserSlice",
    initialState,
    reducers: {
        setAllUsers: (state: TaskUserList, action: PayloadAction<TaskUserType[]>) => {
            state.userList = action.payload;
        },
        setAddNewUser: (state: TaskUserList, action: IAction<string, TaskUserType>) => {
            state.userList.push(action.payload);
        },
        setUserToDelete: (state: TaskUserList, action: PayloadAction<string>) => {
            const index = state.userList.findIndex((user) => user._id === action.payload);
            if (index !== -1) {
                state.userList.splice(index, 1);
            }
        },
    },
});

export const { setAddNewUser, setUserToDelete, setAllUsers } = taskUserActions.actions;
export const taskUserState = (state: RootState) => state.taskUserSlice;
export default taskUserActions.reducer;
