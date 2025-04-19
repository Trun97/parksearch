import './Profile.css'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo.jsx";
import Header from "../../components/Header/Header.jsx";
import smoky from "../../assets/crater-lake.jpg"

function Profile() {
    const {user} = useContext(AuthContext);
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
        <>
            <main className="outer-coll-profile">
                <Header image={smoky} title={"Welcome to your profile"}/>
                <section className="inner-coll-profile">
            <h2>Profile</h2>
            {user && (
                <ProfileInfo username={user.username} email={user.email}/>
            )}

            <h3>Your favorite parks</h3>

            {favorites.length === 0 ? (
                <p>No stored favorites.</p>
            ) : (
                <>
                    <ul className= "favorites-list">
                        {favorites.map((park) => (
                            <li key={park.id}>
                                <Link to={'/detailspark/${park.parkCode}'}>{park.fullName}</Link>
                                <Button onClick={() => removeFavorite(park.id)}>Delete</Button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={clearAllFavorites}>Delete all favorites</Button>
                </>
            )}
                </section>
            </main>
        </>
    );
}

export default Profile;