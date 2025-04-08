import { createContext, useState } from "react";

export const ParkSearchContext = createContext({});

function ParkSearchProvider({ children }) {
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);

    const contextData = {
        selectedFacilities,
        setSelectedFacilities,
        selectedStates,
        setSelectedStates,
    };

    return (
        <ParkSearchContext.Provider value={contextData}>
            {children}
        </ParkSearchContext.Provider>
    );
}

export default ParkSearchProvider;