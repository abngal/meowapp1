import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {

    const navigate = useNavigate();
    const timeBeforeRedirect = 5;

    useEffect( () => {
        setTimeout(() => {
            navigate("/")
        }, timeBeforeRedirect * 1000 );

    }, [navigate]);

    return (
        <div>
            <br/>
            <br/>
            <br/>
            Will redirect to <Link to="/"> Homepage </Link>  in {timeBeforeRedirect}s.
        </div>
    )

}

export default NotFound;
