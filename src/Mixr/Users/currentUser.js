import * as usersClient from "./usersClient";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
function CurrentUser({ children }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async () => {
        const user = await usersClient.account();
        dispatch(setCurrentUser(user));
        setLoading(false);
    };
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    return <>{!loading && children}</>;
}

export default CurrentUser;