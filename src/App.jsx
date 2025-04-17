import './App.css'
import {Routes, Route} from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>}
                />
                <Route
                    path="/parksearch"
                    element={
                        <ProtectedRoute>
                            <ParkSearch />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/searchresult"
                    element={
                        <ProtectedRoute>
                            <SearchResult />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/detailspark/:id"
                    element={
                        <ProtectedRoute>
                            <DetailsPark />
                        </ProtectedRoute>
                    }
                />
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/terms" element={<TermsConditions/>}/>
                <Route path="/privacy" element={<PrivacyNotice/>}/>
            </Routes>
        </>
    )
}

export default App
