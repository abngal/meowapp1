import React, { useEffect, useState } from "react";
import _ from 'lodash';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import CatCard from './CatCard'

import Banner from "../common/Banner";
import { Button } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import './CatList.css'

const CatList: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    let [breeds, setBreeds] = useState<any[]>([]);
    let [selectedBreedId, setSelectedBreedId] = useState('');
    let [breedResults, setBreedResults] = useState<any[]>([]);
    let [searchPage, setSearchPage] = useState(0);
    let [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(false);
    let [isLoadMoreVisible, setIsLoadMoreVisible] = useState(true);
    let [bannerMsg, setBannerMsg] = useState<any>('');
    const apiFetchError = 'Apologies but we could not load new cats for you at this time. Miau!'
    
    /**
    * List of cat breeds
    * Only needed to run once, onmount
    */
    const loadBreeds = () => {
        axios.get('/breeds/').then( (res) => {
            setBreeds(res.data);
        }, (error) => {
            console.log(' msg should appear ...')
            console.log(' error', error)
            setBannerMsg(apiFetchError)
        });
    }

    /**
    * Search cat images on specified breed
    * Use on (1) onload (2) on Load More button
    */
    const searchBreed = (breed: string, page: number) => {
        const url = `images/search?order=asc&page=${page}&limit=10&breed_id=${breed}`
        const p = axios.get(url);
        p.then( null, (error) => {
            setBannerMsg(apiFetchError);
        });
        return p;
    }

    /** 
    *   Clears any old results
    *   Fetches new results for display
    *   Always resets pagination back to 0
    */
    const handleBreedChange = (breedId: string) => {
        setSelectedBreedId(breedId);
        setSearchPage(0);
        searchBreed(breedId, 0).then( (res) => {
            // console.log('res:', res)
            setBreedResults(res.data)
        });
        setIsLoadMoreEnabled(true);
        setSearchParams(`?breeds=${breedId}`)
    }

    /**
     * Loads additional cat images for selected breed
     * Increments results page number
     * Hides load more button on empty response
     */
    const handleLoadMore = () => {
        const nextPage = searchPage + 1;
        searchBreed(selectedBreedId, nextPage).then( (res) => {
            setSearchPage(nextPage);
            if (_.get(res, 'data.length') > 0) {
                const combined = [...breedResults, ...res.data];
                setBreedResults(combined);
            } else {
                setIsLoadMoreVisible(false);
            }

        });

    }

    /**
     * Runs once on mount
     * Loads breed list
     */
    useEffect( () => {
        loadBreeds()
        const paramBreed = searchParams.get('breed');
        if (paramBreed) {
            handleBreedChange(paramBreed);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
      <div className="cat-list-container"> 

        <Banner msg={bannerMsg} />
        <Link to={'/'}>
            <h1> Cat Browser </h1> 
        </Link> 
        <br/> 
        Breed:

        <br/>
        <Form.Select placeholder="Select Breed"
            onChange={ (e) => { handleBreedChange(e.target.value) } } 
            style={{width: '15rem'}}
            value={selectedBreedId} >
            <option value=''> Select Breed </option> 
            {
                breeds?.length > 0 && breeds.map( (breed: any) => (
                    <option key={breed.id} value={breed.id} >  
                        { breed.name } 
                    </option>
                ))   
            }
        </Form.Select> 

        <br/>

        { breedResults.length === 0 ? 'No cats available' : '' }

        <br/>
        <br/>
    
        <div>
            {
                breedResults.map( (result, index) => (
                    <CatCard key={index} imageId={result.id} url={result.url}  /> 
                ))
            }
        </div>

        <span className={isLoadMoreVisible? '': 'hidden'}>
            <Button  disabled={!isLoadMoreEnabled} onClick={ () => { handleLoadMore()} } variant="success"> Load More </Button>
        </span>

      </div>
    );
  }
  
export default CatList;

