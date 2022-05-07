import { createContext } from "react";

export const FollowContext = createContext({
    follows: [],
    insertFollow: (followerId) => {},
});
