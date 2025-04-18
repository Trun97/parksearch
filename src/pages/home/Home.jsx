import './Home.css';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";
import Header from "../../components/Header/Header.jsx";
import rocky from '../../assets/Rocky-mountains-national-park-(3).jpg'

function Home() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header image={rocky} title="National Parks USA"/>
            <section className="homeText">
                <h2>Discover Your Perfect National Park!</h2>
                <p>
                    The United States is home to some of the most beautiful national parks in the world.
                    From breathtaking mountain landscapes to vast forests and deserts, there is always a park
                    that matches your adventurous spirit!
                </p>
                <p>
                    With so many options available, it can be difficult to decide which park best suits your
                    preferences.
                    That's where we come in!
                </p>
                <p>Our user-friendly search function allows you to easily filter by amenities such as:</p>
                <ul>
                    <li>Parking facilities</li>
                    <li>Restrooms and sanitary facilities</li>
                    <li>Fire pits and picnic areas</li>
                    <li>Visitor centers with special accommodations</li>
                </ul>
                <p>
                    Select up to five U.S. states and discover the national parks that perfectly match your needs!
                </p>
                <p>
                    Create an account and log in to find your ideal park and save it as a favorite!
                </p>
                <p>Register or log in to get started!</p>

                <div className="buttons">
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

export default Home;
