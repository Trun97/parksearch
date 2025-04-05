import './ParkSearch.css'
import { useState } from "react";
import usStates from "../../data/usStates.js";

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
    const [selectedStates, setSelectedStates] = useState([])
    const [message, setMessage] = useState("");
    function toggleState(code) {
        console.log("gebruiker klikt op staat:", code);
        setMessage("");
        const currentSelectedStates = [...selectedStates];
        console.log(currentSelectedStates)
        const isAlreadySelected = currentSelectedStates.includes(code);
        console.log(isAlreadySelected)
        if (isAlreadySelected) {
            const updatedStates = currentSelectedStates.filter((stateCode) => {
                return stateCode !== code;
            });
            setSelectedStates(updatedStates);
            console.log(updatedStates)
        } else {
            if (currentSelectedStates.length < 5) {
                currentSelectedStates.push(code);
                setSelectedStates(currentSelectedStates);
                console.log(currentSelectedStates)
            } else {
                setMessage("je mag maar 5 staten kiezen")
            }
        }
    }
    function isStateSelected(code) {
        return selectedStates.includes(code);
    }
    return (
        <>
            <div>
                {usStates.map(({code, name}) => (
                    <label key={code}>
                        <input
                            type="checkbox"
                            value={code}
                            checked={isStateSelected(code)}
                            onChange={() => toggleState(code)}
                        />
                        {name}
                    </label>
                ))}
            </div>
            <div>{message}</div>
        </>
    )
}

export default ParkSearch;