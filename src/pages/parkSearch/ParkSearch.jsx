import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import usStates from "../../data/usStates.js";
import { ParkSearchContext} from "../../context/ParkSearchContext/ParkSearchContext.jsx";

function ParkSearch() {
    const navigate = useNavigate();
    const {
        selectedStates,
        setSelectedStates,
        selectedFacilities,
        setSelectedFacilities,
    } = useContext(ParkSearchContext);

    const [allAmenities, setAllAmenities] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchAmenities() {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/amenities?api_key=${import.meta.env.VITE_NPS_API_KEY}`
                );
                setAllAmenities(response.data.data);
            } catch (err) {
                console.error(err)
                setMessage("Failed to fetch amenities.");
            } finally {
                setLoading(false);
            }
        }

        fetchAmenities();
    }, []);

    function toggleState(code) {
        setMessage("");
        if (selectedStates.includes(code)) {
            setSelectedStates(selectedStates.filter((c) => c !== code));
        } else {
            if (selectedStates.length < 5) {
                setSelectedStates([...selectedStates, code]);
            } else {
                setMessage("You can select up to 5 states.");
            }
        }
    }

    function toggleAmenity(id) {
        setMessage("");
        if (selectedFacilities.includes(id)) {
            setSelectedFacilities(selectedFacilities.filter((a) => a !== id));
        } else {
            if (selectedFacilities.length < 5) {
                setSelectedFacilities([...selectedFacilities, id]);
            } else {
                setMessage("You can select up to 5 amenities.");
            }
        }
    }

    function handleSearch() {
        if (selectedStates.length === 0 || selectedFacilities.length === 0) {
            setMessage("Please select at least one state and one amenity.");
            return;
        }
        setMessage("");
        navigate("/searchresult");
    }

    return (
        <div>
            <h1>Select up to 5 states</h1>
            <div>
                {usStates.map(({ code, name }) => (
                    <label key={code}>
                        <input
                            type="checkbox"
                            value={code}
                            checked={selectedStates.includes(code)}
                            onChange={() => toggleState(code)}
                        />
                        {name}
                    </label>
                ))}
            </div>

            <h2>Select up to 5 amenities</h2>
            <div>
                {allAmenities.map((amenity) => (
                    <label key={amenity.id}>
                        <input
                            type="checkbox"
                            value={amenity.id}
                            checked={selectedFacilities.includes(amenity.id)}
                            onChange={() => toggleAmenity(amenity.id)}
                        />
                        {amenity.name}
                    </label>
                ))}
            </div>

            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading amenities...</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ParkSearch;