import './ParkSearch.css'
import { useState, useEffect } from "react";
import usStates from "../../data/usStates.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ParkSearch() {
    const navigate = useNavigate();
    const [amenities, setAmenities] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    useEffect(() => {
        async function fetchAmenities() {
            try {
                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/amenities?api_key=${import.meta.env.VITE_NPS_API_KEY}`
                );
                setAmenities(response.data.data);
                console.log("Voorzieningen:", response.data.data);
            } catch (err) {
                console.error(err);
                setMessage("Fout bij ophalen voorzieningen");
            }
        }

        fetchAmenities();
    }, []);

    function toggleState(code) {
        console.log("Gebruiker klikt op staat:", code);
        setMessage("");
        const currentSelectedStates = [...selectedStates];
        const isAlreadySelected = currentSelectedStates.includes(code);

        if (isAlreadySelected) {
            const updatedStates = currentSelectedStates.filter((stateCode) => stateCode !== code);
            setSelectedStates(updatedStates);
        } else {
            if (currentSelectedStates.length < 5) {
                currentSelectedStates.push(code);
                setSelectedStates(currentSelectedStates);
            } else {
                setMessage("Je mag maar 5 staten kiezen.");
            }
        }
    }

    function toggleAmenity(amenityId) {
        console.log("toggleAmenity gestart met id:", amenityId);
        setMessage("");

        const isSelected = selectedFacilities.includes(amenityId);
        console.log("Is al geselecteerd?", isSelected);

        if (isSelected) {
            const updatedFacilities = selectedFacilities.filter((id) => id !== amenityId);
            console.log("Voorziening verwijderd:", updatedFacilities);
            setSelectedFacilities(updatedFacilities);
        } else {
            if (selectedFacilities.length < 5) {
                const updatedFacilities = [...selectedFacilities, amenityId];
                console.log("Voorziening toegevoegd:", updatedFacilities);
                setSelectedFacilities(updatedFacilities);
            } else {
                console.log("Teveel voorzieningen geselecteerd");
                setMessage("Je mag maximaal 5 voorzieningen kiezen.");
            }
        }
    }

    function handleSearch() {
        console.log("Geselecteerde staten:", selectedStates);
        console.log("Geselecteerde voorzieningen:", selectedFacilities);

        if (selectedStates.length === 0 || selectedFacilities.length === 0) {
            setMessage("Selecteer minstens 1 staat en 1 voorziening.");
            return;
        }

        setMessage("");
        navigate("/searchresults");
    }

    return (
        <div>
            <h1>Kies maximaal 5 staten</h1>
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

            <h2>Kies maximaal 5 voorzieningen</h2>
            <div>
                {amenities.map((amenity) => (
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

            <button onClick={handleSearch}>Zoek</button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default ParkSearch;
