import './AboutUs.css'
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.jsx";
import Header from "../../components/Header/Header.jsx";
import rocky1 from '../../assets/rocky-mountains3.jpg'

function AboutUs() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <>
            <Header image={rocky1} title="National Parks USA"/>

            <section className="homeText-about">
                <h2>About us - Your nature vacation starts here!</h2>
                <p>
                    Welcome to Park Search USA, an application for nature lovers looking for a national park in
                    the United States.
                    We understand that it can be a challenge to find the park that truly matches your wishes from the
                    many parks that exist.
                </p>
                <p>
                    That’s why we created a user-friendly solution that helps you find exactly what you’re
                    looking for.
                </p>
                <p>With Park Search USA, you can:</p>
                <ul>
                    <li>Filter by key amenities such as restrooms, parking areas, and picnic spots;</li>
                    <li>Select up to five U.S. states where you want to search;</li>
                    <li>View detailed information about each park, including address, theme, and activities;</li>
                    <li>Save your favorite parks for later.</li>
                </ul>
                <p>
                    Our mission is to make your search for the ideal national park easier.
                    Whether you're looking for an hike, a quiet campsite, or family-friendly facilities – we
                    help you find a park that matches your needs.
                </p>
                <p>
                    Register or log in and discover the national parks!
                </p>

                <div className="buttons-about">
                    {!user ? (
                        <>
                            <Button onClick={() => navigate("/register")}>Register</Button>
                            <Button onClick={() => navigate("/login")}>Login</Button>
                        </>
                    ) : (
                        <Button onClick={() => navigate("/parksearch")}>Search Park</Button>
                    )}
                </div>
            </section>
        </>
    );
}

export default AboutUs;