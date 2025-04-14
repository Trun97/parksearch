import './Register.css'

function Register() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Create account</button>
            </form>
        </div>
    );
}

export default Register;
