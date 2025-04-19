import './Register.css';
import {useState} from "react";
import axios from "axios";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import Header from "../../components/Header/Header.jsx";
import rocky2 from "../../assets/chisosMountain.jpg"

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
            console.error(error);
            setError("Something went wrong.");
            setSuccess("");
        }
    }

    return (
        <>
            <main className="outer-coll-register">
                <Header image={rocky2} title="National Parks USA"/>

                <section className="form-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </label>
                        <Button type="submit">Create account</Button>
                    </form>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </section>
            </main>
        </>
    );
}

export default Register;
