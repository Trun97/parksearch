import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext/AuthContext.jsx';
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Header from "../../components/Header/Header.jsx";
import rocky3 from "../../assets/Great-Smoky-Mountains-National-Park.jpg"
import './Login.css';


function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!username || !password) {
            setError("Please enter a username and password");
            return;
        }
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: username,
                password: password,
            });
            login(response.data);
            navigate("/");
        } catch (err) {
            console.error(err.response?.data);
            setError("Username or password is incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="outer-coll">
            <Header image={rocky3} title="National Parks USA"/>
            <section className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <Input type="text" value={username} onChange={handleUsernameChange}/>
                    </label>
                    <br/>
                    <label>
                        Password:
                        <Input type="password" value={password} onChange={handlePasswordChange}/>
                    </label>
                    <br/>
                    <Button type="submit">{loading ? "Logging in..." : "Login"}</Button>
                </form>
                {error && <p>{error}</p>}
            </section>
        </div>
    );
}

export default Login;
