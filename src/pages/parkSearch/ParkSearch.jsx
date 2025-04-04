import './ParkSearch.css'
import { useState, useEffect } from "react";
import axios from "axios";

function ParkSearch(){
    // const [amenities, setAmenities] = useState([]);
    // const [message, setMessage] = useState("");
    //
    // useEffect(() => {
    //     async function fetchAmenities() {
    //         try {
    //             const response = await axios.get(
    //                 `https://developer.nps.gov/api/v1/amenities?api_key=${import.meta.env.VITE_NPS_API_KEY}`
    //             );
    //             setAmenities(response.data.data);
    //             console.log(response.data.data)
    //         } catch (err) {
    //             console.error(err);
    //             setMessage("fout bij ophalen data");
    //         }
    //     }
    //
    //     fetchAmenities();
    // }, []);

    return (
        <h1>Park Search</h1>
);
}

export default ParkSearch;