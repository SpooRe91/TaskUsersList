import Alert from "@mui/material/Alert";
import styles from "./Notification.module.scss";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { globalState, setNotification } from "../../redux-slices/globalSlice";
import { useEffect } from "react";

export const Notification = () => {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const handleConfirmNotification = () => {
        dispatch(setNotification(""));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setNotification(""));
        }, 5000);

        return () => clearTimeout(timeout);
    });

    return (
        <div onClick={() => handleConfirmNotification()} className={styles["notification-modal"]}>
            <Alert style={{ fontSize: "1rem" }} severity="success">
                <>{globalData.notification || "Success"}</>
            </Alert>
        </div>
    );
};

export default Notification;
