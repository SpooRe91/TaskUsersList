import React, { useState } from "react";
import styles from "./UserFormt.module.scss";
import { createUser } from "../../services/taskUsersService";
import { useAppDispatch } from "../../App/hooks";
import { setError, setIsLoading } from "../../redux-slices/globalSlice";
import { setAddNewUser } from "../../redux-slices/taskUserSlice";

type UserData = {
    name: string;
    email: string;
    phone: number | string;
};

export const AddUserForm = () => {
    const [values, setValues] = useState<UserData>({ name: "", email: "", phone: '' });
    const [successfulSubmit, setSuccessfulSubmit] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            dispatch(setIsLoading(true));
            const result = await createUser(values);
            if (result && (result.status >= 200 || result.status <= 300)) {
                dispatch(setAddNewUser(result.data));
                setSuccessfulSubmit(true);
                return;
            }
        } catch (error) {
            dispatch(setError(error as string));
        } finally {
            setValues({ name: "", email: "", phone: 0 });
            dispatch(setIsLoading(false));
        }
    };

    const handleSuccess = () => {
        setSuccessfulSubmit(false);
    };

    return (
        <form className={styles["form"]} onSubmit={handleSubmit}>
            <div className={styles["formGroup"]}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={(e) => handleOnChange(e)}
                    required
                />
            </div>
            <div className={styles["formGroup"]}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => handleOnChange(e)}
                    required
                    pattern="^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$"
                />
            </div>
            <div className={styles["formGroup"]}>
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit phone number"
                    value={values.phone}
                    onChange={(e) => handleOnChange(e)}
                    required
                />
            </div>
            <button type="submit" className={styles["submitButton"]}>
                Add User
            </button>
            {successfulSubmit && (
                <div className={styles["confirmation-container"]}>
                    <p>Added new user successfully!</p>
                    <button onClick={() => handleSuccess()}>Ok</button>
                </div>
            )}
        </form>
    );
};

export default AddUserForm;
