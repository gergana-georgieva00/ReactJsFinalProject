import { useContext } from "react";
import AuthContext from "../contexts/authContext.jsx";

export default function withAuth(Component) {
    const EnhancedComponent = (props) => {
        const auth = useContext(AuthContext);

        return <Component {...props} {...auth} />
    }

    return EnhancedComponent;
}