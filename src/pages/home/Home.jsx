import './Home.css'
import { useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

function Home() {
    const navigate = useNavigate();
    return (
        <>
        <h1>Home</h1>
            <Button type="button" onClick={() => navigate("/parksearch")}>
                Search Park
            </Button>
        </>
    );
}

export default Home;