import './AboutUs.css'
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.jsx";

function AboutUs() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <>
            <h1>About Us</h1>

            <section>
                <h2>Your nature vacation starts here!</h2>
                <p>
                    Welcome to Park Search USA, an pp for nature lovers looking for a national park in
                    the United States.
                    We understand that it can be a challenge to find the park that truly matches your wishes from the
                    many parks that exist.
                </p>
                <p>
                    That’s why we created a  user-friendly solution that helps you find exactly what you’re
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
            </section>

            {user ? (
                <Button type="button" onClick={() => navigate("/parksearch")}>
                    Search Park
                </Button>
            ) : (
                <div>
                    <Button type="button" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                    <Button type="button" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </div>
            )}
        </>
    );
}

export default AboutUs;