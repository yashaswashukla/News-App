import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const [progress, setProgress] = useState(0);
    return (
      <>
        <BrowserRouter>
            <Navbar/>
          <LoadingBar
            color = "#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(progress)}
          />
          <Routes>
            <Route exact path = "/" element ={<News setProgress = {setProgress} key = 'general' pageSize = {9} category = "general" country = "in"/>}/>
            <Route exact path = "/business" element ={<News setProgress = {setProgress} key = 'business' pageSize = {9} category = "business" country = "in"/>}/>
            <Route exact path = "/entertainment" element ={<News setProgress = {setProgress} key = 'entertainment' pageSize = {9} category = "entertainment" country = "in"/>}/>
            <Route exact path = "/health" element ={<News setProgress = {setProgress} key = 'health' pageSize = {9} category = "health" country = "in"/>}/>
            <Route exact path = "/science" element ={<News setProgress = {setProgress} key = 'science' pageSize = {9} category = "science" country = "in"/>}/>
            <Route exact path = "/sports" element ={<News setProgress = {setProgress} key = 'sports' pageSize = {9} category = "sports" country = "in"/>}/>
            <Route exact path = "/technology" element ={<News setProgress = {setProgress} key = 'technology' pageSize = {9} category = "technology" country = "in"/>}/>
          </Routes>  
        </BrowserRouter>
      </>
    )
}

