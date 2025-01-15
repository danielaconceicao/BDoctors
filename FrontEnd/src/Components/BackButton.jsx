import { useNavigate} from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate();

    function handleNavigate(){
        navigate(-1)
    }

    return(
        <button onClick={handleNavigate} className="btn btn-primary mx-3">Home <i className="bi bi-house"></i> </button>
    )
}