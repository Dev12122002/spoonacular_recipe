// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Logout from "./pages/Logout";
import RecipeDetails from './pages/RecipeDetails';
// import Header from "./components/Header";
import { Toaster } from 'react-hot-toast';
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Toaster position='top-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RecipeDetails" element={<RecipeDetails />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
