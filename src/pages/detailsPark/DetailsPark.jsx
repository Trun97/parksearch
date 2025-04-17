import './DetailsPark.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button.jsx";
import ParkSection from "../../components/ParkSection/ParkSection.jsx";

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
        const storedFavorites = localStorage.getItem("favorites");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        const alreadyExists = favorites.some((fav) => fav.id === park.id);

        if (alreadyExists) {
            setMessage("This park is already in the favorites list.");
        } else {
            const updatedFavorites = [...favorites, {
                id: park.id,
                parkCode: park.parkCode,
                fullName: park.fullName
            }];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
                <ParkSection title="Operating Hours">
                    {park.operatingHours[0].description}
                </ParkSection>
            )}

            {park.weatherInfo && (
                <ParkSection title="Weather Info">
                    {park.weatherInfo}
                </ParkSection>
            )}

            {park.contacts?.emailAddresses?.[0]?.emailAddress && (
                <ParkSection title="Contact">
                    Email: {park.contacts.emailAddresses[0].emailAddress}
                </ParkSection>
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
            <Button onClick={handleAddFavorite}>Add to favorites</Button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DetailsPark;
