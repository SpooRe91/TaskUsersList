import Alert from "@mui/material/Alert";
import styles from "./ErrorMessageComp.module.scss";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { globalState, setError } from "../../redux-slices/globalSlice";

export const ErrorMessage = () => {
    const globalData = useAppSelector(globalState);
    const dispatch = useAppDispatch();

    const handleConfirmError = () => {
        dispatch(setError(""));
    };
    console.log(globalData.errorMessage);
    return (
        <div className={styles["error-modal"]}>
            <Alert style={{ fontSize: "1.5rem" }} severity="error">
                {/*IF THERE IS AN ERORR PASSED - DISPLAY THAT, OTHERWISE DISPLAY THE GLOBAL ERROR */}
                <>{globalData.errorMessage && globalData.errorMessage}</>
            </Alert>
            <button onClick={() => handleConfirmError()}>OK</button>
        </div>
    );
};

export default ErrorMessage;
