import { createContext } from "react";

export const UserContext = createContext({
    users: [],
    insertUsers: (user) => {},
    updateUsers: (user) => {},
});
