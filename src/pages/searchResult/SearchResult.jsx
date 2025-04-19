import './SearchResult.css'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ParkSearchContext} from "../../context/ParkSearchContext/ParkSearchContext.jsx";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import smoky1 from "../../assets/SmokyMountains2.jpg"


function SearchResult() {
    const {selectedStates, selectedFacilities} = useContext(ParkSearchContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [parks, setParks] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchParks() {
            setLoading(true);
            setError("");
            try {
                const response2 = await axios.get(`https://developer.nps.gov/api/v1/amenities/parksplaces?stateCode=${selectedStates.join(",")}&id=${selectedFacilities.join(",")}&api_key=${import.meta.env.VITE_NPS_API_KEY}`);
                const parksPlacesData = response2.data.data;
                const parkCodes = [];

                parksPlacesData.map((item) => {
                    item.parks?.map((park) => {
                        if (!parkCodes.includes(park.parkCode)) {
                            parkCodes.push(park.parkCode);
                        }
                    })
                })
                if (parkCodes.length === 0) {
                    setError("No parks found for this selection.");
                    setParks([]);
                    setLoading(false);
                }
                const res2 = await axios.get(
                    `https://developer.nps.gov/api/v1/parks?parkCode=${parkCodes.join(",")}&api_key=${import.meta.env.VITE_NPS_API_KEY}`
                );

                const allParks = res2.data.data;
                const filtered = [];

                for (let i = 0; i < allParks.length; i++) {
                    const park = allParks[i];
                    const parkStateString = park.states;
                    const parkStateArray = parkStateString.split(",");

                    for (let j = 0; j < parkStateArray.length; j++) {
                        const state = parkStateArray[j];

                        if (selectedStates.includes(state)) {
                            filtered.push(park);
                        }
                    }
                }

                if (filtered.length === 0) {
                    setError("No parks found in the selected states.");
                    setParks([]);
                } else {
                    setParks(filtered);
                    setError("");
                }

            } catch (err) {
                console.error("error fetching data:", err)
                setError("Something went wrong, please try again")
            } finally {
                setLoading(false);
            }
        }

        fetchParks();
    }, [selectedStates, selectedFacilities]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <main className="outer-coll-search">
                <Header image={smoky1} title="Found Parks" />
                <section className="results">
            {error && <p className="error">{error}</p>}

            {parks.length > 0 && (
                <div className="inner-coll-search">
                    {parks.map((park) => (
                        <div key={park.id} className="park-card">
                            <h2 className="title" onClick={() => navigate(`/detailspark/${park.parkCode}`)}>
                                {park.fullName}
                            </h2>

                            <img
                                src={park.images?.[0]?.url}
                                alt={park.fullName}
                            />

                            <p>{park.states}</p>
                        </div>
                    ))}
                </div>
            )}
            </section>
            </main>
        </>
    );
}


export default SearchResult;