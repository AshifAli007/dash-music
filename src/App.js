import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import './CSS/App.scss';
// import './canvas';
import MainPage from './Components/MainPage';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
