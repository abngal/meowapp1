import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import './Banner.css'

interface Props {
    msg?: any,
}

const Banner: React.FC<Props> = ({msg}) => {

    const [isVisible, setIsVisible ] = useState(false);
    const timeBannerIsVisible = 5000;

    /**
     * On receive of new message, show banner
     * After some seconds banner will disappear
     */
    useEffect( () => {
        if (msg) {
            setIsVisible(true);
            setTimeout( (msg) => {
                setIsVisible(false);
            }, timeBannerIsVisible);
        }

    }, [msg]);


    return (
        <div className={`alert-msg-container  ${ isVisible ? '': 'hidden' }` }> 
            <Alert key={1} variant={'warning'}>
                { msg }
                <div onClick={() => setIsVisible(false) } className="close-button">
                    x
                </div>
            </Alert>
        </div>
    )
}
export default Banner;
