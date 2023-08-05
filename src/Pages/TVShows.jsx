import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../Store";
import SelectGenre from "../Components/SelectGenre";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";

function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(undefined);

  // extract genres list from api when components rendered
  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  // when genresloaded extract movies list for select genres from api
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded]);


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows Avaialble For The Selected Genre. Please Select A Different Genre.
          </h1>        
        )}
      </div>
      <hr />
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      color:white;
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default TVShows;
