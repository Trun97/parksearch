import './Home.css'
import { useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <>
        <h1>Home</h1>
            <button type="button" onClick={()=> navigate("/parksearch")}>Search Park</button>
        </>
    );
}

export default Home;