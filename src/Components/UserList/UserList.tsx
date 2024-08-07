import { User } from "../User/User";
import { TaskUserType } from "../../redux-slices/taskUserSlice";
import { Typography } from "@mui/material";
import styles from "./UsersList.module.scss";

type UsersListProps = {
    users: TaskUserType[];
    handleDeleteUser: (userId: string) => void;
};

export const UsersList = ({ users, handleDeleteUser }: UsersListProps) => {
    if (users.length === 0) {
        return (
            <Typography
                variant="h5"
                style={{
                    textAlign: "center",
                    backgroundColor: "#00000069",
                    borderRadius: "10px",
                    backdropFilter: "blur(5px)",
                }}
            >
                No users to display!
            </Typography>
        );
    }

    return (
        <div className={styles["users-list"]}>
            {users.map((user) => (
                <User
                    key={user._id}
                    _id={user._id}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    handleDeleteUser={handleDeleteUser}
                />
            ))}
        </div>
    );
};

export default UsersList;
