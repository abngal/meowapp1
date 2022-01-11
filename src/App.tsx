import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import axios from "axios";

import CatDetail from './components/cat/CatDetail';
import CatList from './components/cat/CatList';
import './App.css';

axios.defaults.headers.common['x-api-key'] = `ac9d1e26-8947-4d23-b8a4-d2586e445154`;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/'


const App: React.FC = () => {

  return (
    <div className="App">
      
        <BrowserRouter>
          <Routes>
            
                <Route path="/" element={<CatList/>}></Route>
                <Route path="/cat/:imageId" element={<CatDetail/>}></Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
