import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './CatDetail.css'
import axios from "axios";
import { Link } from "react-router-dom";
import _ from 'lodash';

const CatDetail: React.FC = () => {

    const params = useParams()
    
    const [imageInfo, setImageInfo] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const id = params['imageId'];
      setIsLoading(true);
      if (id) {
        axios.get(`images/${id}`).then( (res) => {
          setImageInfo(res.data);
          setIsLoading(false);
        });
      }
    }, [params]) ;

    return (

      <div className={`cat-detail-container ${isLoading? 'hidden': ''}` } style={{ margin: '2em'}}>

        <Card>
          <Card.Header >
              <Link to={`/?breed=${_.get(imageInfo, 'breeds[0].id')}`}>
                <Button variant="primary"> Back </Button>
              </Link> 
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={`${imageInfo?.url}`} />
            <br/>

            <Card.Text as="div">  
                <br/>
                <h5> { _.get(imageInfo, 'breeds[0].name') } </h5> 
                <h6> Origin: { _.get(imageInfo, 'breeds[0].origin')  } </h6> 

                <p> { _.get(imageInfo, 'breeds[0].temperament') }  </p> 
                
                <span> 
                    <p> { _.get(imageInfo, 'breeds[0].description') }  </p> 
                </span>

            </Card.Text>
          </Card.Body>
        </Card>

      </div>

    );
  }
  
export default CatDetail;