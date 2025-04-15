
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");

        if (token && username && email) {
            try {
                const decoded = jwtDecode(token);

                setAuthState({
                    user: { username, email },
                    status: "done",
                });
            } catch (e) {
                console.error(e);
                localStorage.clear();
                setAuthState({ user: null, status: "done" });
            }
        } else {
            setAuthState({ user: null, status: "done" });
        }
    }, []);

    function login(data) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        setAuthState({
            user: {
                username: data.username,
                email: data.email,
            },
            status: "done",
        });
    }

    function logout() {
        localStorage.clear();
        setAuthState({ user: null, status: "done" });
    }

    const contextData = {
        ...authState,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {authState.status === "pending" ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

