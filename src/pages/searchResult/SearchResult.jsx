import './SearchResult.css'
import {useContext, useEffect, useState } from "react";
import axios from "axios";
import { ParkSearchContext} from "../../context/ParkSearchContext/ParkSearchContext.jsx";

function SearchResult() {
    const { selectedStates, selectedFacilities } = useContext(ParkSearchContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchParks() {
            setLoading(true)
            try {
                const response2 = await axios.get( `https://developer.nps.gov/api/v1/amenities/parksplaces?stateCode=${selectedStates.join(",")}&id=${selectedFacilities.join(",")}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
                console.log(response2.data.data);
            } catch(err) {
                console.error("fout bij data ophalen", err)
                setError("iets ging niet goed")
            } finally {
                setLoading(false);
            }
        }

        fetchParks();
    }, [selectedStates, selectedFacilities]);

    return <h1>Search Result</h1>;
}

export default SearchResult;