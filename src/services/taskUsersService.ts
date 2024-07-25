import axios, { AxiosError } from "axios";

const API_URL = "https://mb-multi-tool-api.vercel.app/taskUsers";

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
};

type UserData = {
    name: string;
    email: string;
    phone: number | string;
};

const handleError = (error: unknown): string => {
    if (typeof error === "string") {
        throw error.toUpperCase();
    }
    if (error instanceof AxiosError) {
        throw `We ran into a newtowrk error, please try again later!`;
    }

    throw "An unknown error occurred.";
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get<User[]>(`${API_URL}/allUsers`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createUser = async (userData: UserData) => {
    try {
        const result = await axios.post(`${API_URL}/create`, userData);
        return result;
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const result = await axios.delete(`${API_URL}/delete/${userId}`);
        return result.status;
    } catch (error) {
        handleError(error);
    }
};
