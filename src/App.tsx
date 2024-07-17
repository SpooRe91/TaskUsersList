import { useAppSelector } from "./App/hooks";
import ErrorMessage from "./Components/ErrorMessageComp/ErrorMessageComp";
import GlobalLoader from "./Components/GlobalLoader/GlobalLoader";
import UserData from "./Components/UserData/UserData";
import { globalState } from "./redux-slices/globalSlice";
import "./styles/index.scss";

function App() {
    const globalData = useAppSelector(globalState);
    const hasErrorOnApp = !!globalData.errorMessage;

    return (
        <div className="main">
            {globalData.isLoading && (
                <div className="loader-comp">
                    <GlobalLoader />
                </div>
            )}
            {hasErrorOnApp && (
                <div className="error-container">
                    <ErrorMessage />
                </div>
            )}
            <UserData />
        </div>
    );
}

export default App;
