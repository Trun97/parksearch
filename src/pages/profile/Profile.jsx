import './Profile.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { Link } from "react-router-dom";

function Profile() {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            setFavorites(parsedFavorites);
        }
    }, []);

    function removeFavorite(id) {
        const updated = favorites.filter((fav) => fav.id !== id);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    }

    function clearAllFavorites() {
        setFavorites([]);
        localStorage.removeItem("favorites");
    }

    return (
        <div>
            <h2>Profile</h2>

            {user && (
                <>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>E-mailadres:</strong> {user.email}</p>
                </>
            )}

            <h3>Your favorite parks</h3>

            {favorites.length === 0 ? (
                <p>No stored favorites.</p>
            ) : (
                <>
                    <ul>
                        {favorites.map((park) => (
                            <li key={park.id}>
                                <Link to={`/detailspark/${park.parkCode}`}>{park.fullName}</Link>
                                <button onClick={() => removeFavorite(park.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearAllFavorites}>Delete all favorites</button>
                </>
            )}
        </div>
    );
}

export default Profile;
