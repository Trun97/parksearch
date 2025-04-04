import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import AboutUs from "./pages/about us/AboutUs.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ParkSearch from "./pages/parkSearch/ParkSearch.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import DetailsPark from "./pages/detailsPark/DetailsPark.jsx";
import Contact from "./pages/contact/Contact.jsx";
import TermsConditions from "./pages/terms & conditions/TermsConditions.jsx";
import PrivacyNotice from "./pages/privacy notice/PrivacyNotice.jsx";
import {useState, useEffect} from "react";
import axios from "axios";



function App() {
    const [amenities, setAmenities] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchAmenities() {
            try {
                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/amenities?api_key=${import.meta.env.VITE_NPS_API_KEY}`
                );
                setAmenities(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                console.error(err);
                setMessage("fout bij ophalen data");
            }
        }

        fetchAmenities();
    }, []);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/parksearch" element={<ParkSearch/>}/>
                <Route path="/searchresult" element={<SearchResult/>}/>
                <Route path="/detailspark" element={<DetailsPark/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/terms" element={<TermsConditions/>}/>
                <Route path="/privacy" element={<PrivacyNotice/>}/>
            </Routes>
        </>
    )
}

export default App
