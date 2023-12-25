import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieSearch from "./components/MovieSearch";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [term, setTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = term
          ? `https://api.themoviedb.org/3/search/movie?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&query=${term}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }`;

        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
        setError("Error fetching movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [term]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div className={`container ${darkMode ? "dark" : ""} sm:text-sm`}>
        <div
          className={`font-mono mb-8 flex flex-col sm:flex-row justify-between items-center ${
            darkMode ? "text-white" : "text-black"
          }`}>
          <h1 className="text-sm pt-5 md:text-2xl lg:text-4xl font-bold ml-10 text-orange-700 pr-3">
            FlickFiesta
          </h1>
          <MovieSearch searchText={(text) => setTerm(text)} darkMode={darkMode} />
          <div className="flex">
            <label className="flex items-center pl-2 text-xl">
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="ml-2"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-8 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} darkMode={darkMode} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
