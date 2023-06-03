import React, { useState } from "react";
import "./App.css";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b964182d9ad0d2eae80588f7d2a4f3b5&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b964182d9ad0d2eae80588f7d2a4f3b5&query="';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else return "red";
  };

  const showMovies = (movies) => {
    setMovies(movies);
  };

  const handlePopularClick = async () => {
    await getMovies(API_URL);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm && searchTerm !== "") {
      await getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    } else {
      window.location.reload();
    }
  };

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
  };

  return (
    <div>
      <header>
        <button className="popular" onClick={handlePopularClick}>
          What's popular
        </button>
        <form id="form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            id="search"
            className="search"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>

      <main id="main">
        {movies.map((movie) => {
          const { title, poster_path, overview, vote_average } = movie;

          return (
            <div className="movie" key={movie.id}>
              <img src={IMG_PATH + poster_path} alt={title} />
              <div className="movie-info">
                <h3>{title}</h3>
                <span className={getClassByRate(vote_average)}>
                  {vote_average}
                </span>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                {overview}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default App;
