import React from "react";
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './CatCard.css'

interface Props {
    imageId: string
    url: string
}

const CatCard: React.FC<Props> = ({imageId, url}) => {

    return (
        <div className="cat-card-container"> 

            <Card>
                <Card.Img variant="top" src={url} />
                <Card.Body>
                    <Link to={`/cat/${imageId}`}>
                        <Button variant="primary"> View Details </Button>
                    </Link>
                </Card.Body>
            </Card>

        </div>
    );
  }
  
export default CatCard;