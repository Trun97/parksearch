import './NavBar.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx"

function NavBar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Home</Link>{" "}
            <Link to="/aboutus">About Us</Link>
            <Link to="/profile">Profile</Link>

            {!user && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}

            {user && (
                <>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default NavBar;
