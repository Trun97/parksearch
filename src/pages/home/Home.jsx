import './Home.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";

function Home() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <>
            <h1>Home</h1>
            <section>
                <h2>Discover the perfect National Park to visit!</h2>
                <p>
                    The United States is home to some of the most beautiful national parks in the world. From
                    mountainess landscapes to forests and deserts, there is always a park that matches
                    your needs!
                </p>
                <p>
                    With so many options available, it can be difficult to decide which park best suits your
                    needs. That's what this application is for!
                </p>
                <p>Our user-friendly search function allows you to easily filter by amenities such as:</p>
                <ul>
                    <li>Parking facilities</li>
                    <li>Restrooms and sanitary facilities</li>
                    <li>Fire pits and picnic areas</li>
                    <li>Visitor centers with special accommodations</li>
                </ul>
                <p>
                    Select up to five U.S. states and discover the national parks that match your needs!
                </p>
                <p>
                    Create an account and log in to find your ideal park and save it as a favorite!
                </p>
                <p>Register or log in to get started!</p>
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

export default Home;
