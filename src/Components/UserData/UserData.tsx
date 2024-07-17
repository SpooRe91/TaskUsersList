import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { setError, setIsLoading, setNotification } from "../../redux-slices/globalSlice";
import { setAllUsers, setUserToDelete, taskUserState, TaskUserType } from "../../redux-slices/taskUserSlice";
import { deleteUser, getAllUsers } from "../../services/taskUsersService";
import { AxiosError } from "axios";
import styles from "./UserData.module.scss";
import UsersList from "../UserList/UserList";
import AddUserForm from "../UserForm/UserForm";
import { Dialog } from "@mui/material";

const USERS_PER_PAGE = 6;
export const UserData = () => {
    const userData = useAppSelector(taskUserState);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setToShowForm] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<TaskUserType[]>([]);

    const handleDeleteUser = async (userId: string) => {
        try {
            dispatch(setIsLoading(true));
            const resultStatus = await deleteUser(userId);

            if (resultStatus && (resultStatus >= 200 || resultStatus <= 300)) {
                dispatch(setUserToDelete(userId));
                dispatch(setNotification("User deleted successfully!"));
                if (userData.userList.length) {
                    setCurrentPage(1);
                }
                return;
            }
        } catch (error: unknown) {
            dispatch(setError(error as string));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleShowForm = () => {
        setToShowForm((state) => !state);
    };

    const handleCloseForm = () => {
        setToShowForm(false);
    };

    const handleSearchInput = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setSearchValue(value);

        if (value.trim() === "") {
            setFilteredUsers([]);
        } else {
            const filtered = userData.userList.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                dispatch(setIsLoading(true));
                const data = await getAllUsers();
                if (data && typeof data !== "string") {
                    dispatch(setAllUsers(data));
                    return;
                }
            } catch (error) {
                console.error("Failed to fetch users data", error);
                if (!(error instanceof AxiosError)) {
                    dispatch(setError("An unexpected arror occured. Please try again later"));
                    return;
                }
                return dispatch(setError(error.message));
            } finally {
                dispatch(setIsLoading(false));
            }
        };
        fetchUsers();
    }, [dispatch, userData.userList.length]);

    const indexOfLastUser = currentPage * USERS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
    const usersToDisplay = searchValue.trim() === "" ? userData.userList : filteredUsers;
    const totalUsers = searchValue.trim() === "" ? userData.userList.length : filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

    const currentUsers = useMemo(() => {
        return usersToDisplay.slice(indexOfFirstUser, indexOfLastUser);
    }, [usersToDisplay, indexOfFirstUser, indexOfLastUser]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className={styles["user-data-main"]}>
            <button className={styles["show-form-button"]} onClick={() => handleShowForm()}>
                Show form
            </button>
            {!showForm ? (
                <div className={styles["users-list-container"]}>
                    {!!currentUsers.length && (
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => handleSearchInput(e)}
                            value={searchValue}
                            placeholder="Search by name"
                        />
                    )}
                    <UsersList users={currentUsers} handleDeleteUser={handleDeleteUser} />
                    <div className={styles["pagination"]}>
                        {Array.from({ length: totalPages }, (_, number) => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={currentPage === number + 1 ? styles.active : ""}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <Dialog open={showForm}>
                    <AddUserForm />
                    <button onClick={() => handleCloseForm()}>Close</button>
                </Dialog>
            )}
        </div>
    );
};

export default UserData;
