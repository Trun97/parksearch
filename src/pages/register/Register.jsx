import './Register.css';
import { useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");

        try {
            await axios.post(
                "https://frontend-educational-backend.herokuapp.com/api/auth/signup",
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: ["user"],
                }
            );

            setSuccess("Registration successful! You can now log in.");
            setError("");
        } catch (error) {
            setError("Something went wrong.");
            setSuccess("");
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <Button type="submit">Create account</Button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}

export default Register;
