import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("light");

  const toggleMode = () =>{
    if(mode === "light")
    {
      setMode("dark");
      document.body.style.backgroundColor = "#171a1d";
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  }
    return (
      <>
        <BrowserRouter>
            <Navbar toggleMode ={toggleMode} mode = {mode} />
          <LoadingBar
            color = "#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(progress)}
          />
          <Routes>
            <Route exact path = "/" element ={<News mode = {mode} setProgress = {setProgress} key = 'general' pageSize = {9} category = "general" country = "in"/>}/>
            <Route exact path = "/business" element ={<News mode = {mode} setProgress = {setProgress} key = 'business' pageSize = {9} category = "business" country = "in"/>}/>
            <Route exact path = "/entertainment" element ={<News mode = {mode} setProgress = {setProgress} key = 'entertainment' pageSize = {9} category = "entertainment" country = "in"/>}/>
            <Route exact path = "/health" element ={<News mode = {mode} setProgress = {setProgress} key = 'health' pageSize = {9} category = "health" country = "in"/>}/>
            <Route exact path = "/science" element ={<News mode = {mode} setProgress = {setProgress} key = 'science' pageSize = {9} category = "science" country = "in"/>}/>
            <Route exact path = "/sports" element ={<News mode = {mode} setProgress = {setProgress} key = 'sports' pageSize = {9} category = "sports" country = "in"/>}/>
            <Route exact path = "/technology" element ={<News mode = {mode} setProgress = {setProgress} key = 'technology' pageSize = {9} category = "technology" country = "in"/>}/>
          </Routes>  
        </BrowserRouter>
      </>
    )
}

