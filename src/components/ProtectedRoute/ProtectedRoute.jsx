import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";

function ProtectedRoute({ children }) {
    const { user, status } = useContext(AuthContext);

    if (status === "pending") {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;