import Alert from "@mui/material/Alert";
import styles from "./ErrorMessageComp.module.scss";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { globalState, setError } from "../../redux-slices/globalSlice";
import { useEffect } from "react";

export const ErrorMessage = () => {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const handleConfirmError = () => {
        dispatch(setError(""));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setError(""));
        }, 5000);

        return () => clearTimeout(timeout);
    });

    return (
        <div onClick={() => handleConfirmError()} className={styles["error-modal"]}>
            <Alert style={{ fontSize: "1rem" }} severity="error">
                <>{globalData.errorMessage || "Something went wrong"}</>
            </Alert>
        </div>
    );
};

export default ErrorMessage;
