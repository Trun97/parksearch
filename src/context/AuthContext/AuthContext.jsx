import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    useEffect(() => {
        console.log("Auth check gestart...");

        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");

        if (token && username && email) {
            try {
                const decoded = jwtDecode(token);
                console.log("Geldig token gevonden");
                console.log("Gebruikersnaam:", username);
                console.log("E-mail:", email);

                setAuthState({
                    user: { username, email },
                    status: "done",
                });
            } catch (e) {
                console.error("Ongeldig token:", e);
                localStorage.clear();
                setAuthState({ user: null, status: "done" });
            }
        } else {
            console.log("Geen token gevonden of onvolledige info");
            setAuthState({ user: null, status: "done" });
        }
    }, []);

    function login(data) {
        console.log("Inloggen met data:", data);

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

        console.log("Gebruiker succesvol ingelogd");
    }

    function logout() {
        console.log("Uitloggen...");
        localStorage.clear();
        setAuthState({ user: null, status: "done" });
        console.log("Gebruiker uitgelogd");
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
