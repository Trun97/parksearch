import './DetailsPark.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailsPark() {
    const { id } = useParams();
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(() => {
        async function fetchParkDetails() {
            try {
                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/parks?parkCode=${id}&api_key=${import.meta.env.VITE_NPS_API_KEY}`
                );

                setPark(response.data.data[0]);
            } catch (error) {
                console.error("error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchParkDetails();
    }, [id]);

    function handleAddFavorite() {
        if (!park) return;

        console.log("Favoriet toevoegen gestart.");
        const storedFavorites = localStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        console.log("Huidige favorieten in localStorage:", favorites);

        const alreadyExists = favorites.some((fav) => fav.id === park.id);

        if (alreadyExists) {
            console.log("Park staat al in favorieten");
            setMessage("This park is already in the favorites list.");
        } else {
            const updatedFavorites = [...favorites, {
                id: park.id,
                parkCode: park.parkCode,
                fullName: park.fullName
            }];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            console.log("Park toegevoegd aan localStorage:", park.fullName);
            setMessage("Park added tot favorites!");
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!park) return <p>Park not found.</p>;

    return (
        <div>
            <h1>{park.fullName}</h1>

            {park.images?.[0]?.url && (
                <img src={park.images[0].url} alt={park.fullName} />
            )}

            <p>{park.description}</p>

            {park.operatingHours?.[0]?.description && (
                <div>
                    <h2>Operating Hours</h2>
                    <p>{park.operatingHours[0].description}</p>
                </div>
            )}

            {park.weatherInfo && (
                <div>
                    <h2>Weather Info</h2>
                    <p>{park.weatherInfo}</p>
                </div>
            )}

            {park.contacts?.emailAddresses?.[0]?.emailAddress && (
                <div>
                    <h2>Contact</h2>
                    <p>Email: {park.contacts.emailAddresses[0].emailAddress}</p>
                </div>
            )}

            {park.activities?.length > 0 && (
                <div>
                    <h2>Activities</h2>
                    <ul>
                        {park.activities.map((activity) => (
                            <li key={activity.id}>{activity.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleAddFavorite}>Add to favorites</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DetailsPark;
