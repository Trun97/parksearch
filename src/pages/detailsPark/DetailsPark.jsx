import './DetailsPark.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailsPark() {
    const { id } = useParams();
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p>Loading...</p>;
    if (!park) return <p>Park not found.</p>;

    return (
        <div>
            <h1>Details Park</h1>
            <p>{park.fullName}</p>
            <p>{park.description}</p>
            <p>{park.operatingHours[0].description}</p>
            <p>{park.weatherInfo}</p>
            <p>Email: {park.contacts.emailAddresses[0].emailAddress}</p>
        </div>
    );
}

export default DetailsPark;
