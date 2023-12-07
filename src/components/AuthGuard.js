import { useContext } from "react"
import { Redirect, Switch } from "react-router-dom";
import AuthContext from "../contexts/authContext"

export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return <Switch />;
}