import { useState, useEffect } from "react";
import "./App.css";
import Movie from "./components/Movie/Movie";
import Footer from "./components/Footer/Footer";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=b964182d9ad0d2eae80588f7d2a4f3b5&query="';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b964182d9ad0d2eae80588f7d2a4f3b5&page=${page}`;

  useEffect(() => {
    getMovies(API_URL);
  }, [page]);

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  // Popular Movies
  const handlePopularClick = async () => {
    setPage(1);
    setSearchTerm("");
    await getMovies(API_URL);
  };

  // Search Submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPage(1);

    if (searchTerm && searchTerm !== "") {
      await getMovies(SEARCH_API + searchTerm);
    } else {
      window.location.reload();
    }
  };

  // Next Page Button
  const handleNextPage = async () => {
    if (searchTerm) return;

    setPage(page + 1);
    await getMovies(API_URL);
  };

  // Previous Page Button
  const handlePreviousPage = async () => {
    if (searchTerm) return;

    setPage((prevState) => {
      if (prevState === 1) {
        setPage(1);
      } else {
        setPage(page - 1);
      }
    });

    await getMovies(API_URL);
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
          movie;

          return <Movie key={movie.id} {...movie} />;
        })}
      </main>

      <Footer
        page={page}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default App;
