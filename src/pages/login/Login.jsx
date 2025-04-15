import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext/AuthContext.jsx'

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        console.log("Gebruikersnaam:", e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        console.log("Wachtwoord:", e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Gegevens worden verzonden");
        console.log("Gebruikersnaam:", username);
        console.log("Wachtwoord:", password);

        if (!username || !password) {
            console.log("Velden mogen niet leeg zijn");
            setError("Please enter a username and password");
            return;
        }

        setError("");

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: username,
                password: password,
            });

            console.log("Inloggen gelukt, response:", response.data);
            login(response.data);
            navigate("/");
        } catch (err) {
            console.log("Inloggen mislukt:", err.response?.data);
            setError("Username or password is incorrect");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
