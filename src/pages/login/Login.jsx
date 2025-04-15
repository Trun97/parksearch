import './Login.css'
import { useState } from "react";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleUsernameChange(e) {
        setUsername(e.target.value);
        console.log("Gebruikersnaam:", e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        console.log("Wachtwoord:", e.target.value);
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
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
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
