import './DetailsPark.css'
import {useParams} from "react-router-dom";

function DetailsPark(){
    const { id } = useParams()

    return <h1>Details Park</h1>;
}

export default DetailsPark;