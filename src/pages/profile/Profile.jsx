import './Profile.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { Link } from "react-router-dom";

function Profile() {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        console.log("useEffect gestart: proberen favorieten op te halen.");

        const storedFavorites = localStorage.getItem("favorites");
        console.log("Ruwe localStorage waarde:", storedFavorites);

        if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            console.log("Parsed favorieten:", parsedFavorites);
            setFavorites(parsedFavorites);
        } else {
            console.log("Geen favorieten gevonden in localStorage.");
        }
    }, []);

    return (
        <div>
            <h1>Profile</h1>

            {user && (
                <>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>E-mailadres:</strong> {user.email}</p>
                </>
            )}

            <h3>Your favorite parks</h3>

            {favorites.length === 0 ? (
                <p>No stored favorites</p>
            ) : (
                <ul>
                    {favorites.map((park) => (
                        <li key={park.id}>
                            <Link to={`/detailspark/${park.parkCode}`}>{park.fullName}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Profile;
