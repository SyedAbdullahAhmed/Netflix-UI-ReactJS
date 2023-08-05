import React from 'react';
import './App.css';
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Netflix from "./Pages/Netflix";
import Movies from './Pages/Movies';
import TVShows from './Pages/TVShows';
import Player from './Pages/Player';
import UserListedMovies from './Pages/UserListedMovies';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tvshows" element={<TVShows />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/" element={<Netflix />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
