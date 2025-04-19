import './NavBar.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import Button from "../Button/Button.jsx";

function NavBar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div>
                <h1 className="logo">Park Search USA</h1>
            </div>
            <div className="navbar-right">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/aboutus" className="nav-link">About Us</Link>

                {user ? (
                    <>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Button onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
