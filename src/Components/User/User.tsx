import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./User.module.scss";

type UserProps = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    handleDeleteUser: (userId: string) => void;
};

export const User = ({ _id, name, email, phone, handleDeleteUser }: UserProps) => {
    const [toDelete, setToDelete] = useState<boolean>(false);

    const handleDeleteTrigger = () => setToDelete((state) => !state);

    const handleConfirmDelete = (status: boolean) => {
        if (status) {
            handleDeleteUser(_id);
            return;
        }
        setToDelete(false);
    };

    return (
        <Card style={{ background: "#f3d0a4" }} className={styles["user-card"]} variant="outlined">
            <CardContent>
                <div className={styles["user-info"]}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body1">{email}</Typography>
                    <Typography variant="body2">{phone}</Typography>
                </div>
                {!toDelete ? (
                    <button className={styles["delete-button"]} onClick={() => handleDeleteTrigger()}>
                        Delete
                    </button>
                ) : (
                    <div className={styles["buttons-container"]}>
                        <p>Delete user?</p>
                        <button className={styles["yes-button"]} onClick={() => handleConfirmDelete(true)}>
                            Yes
                        </button>
                        <button className={styles["no-button"]} onClick={() => handleConfirmDelete(false)}>
                            No
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default User;
