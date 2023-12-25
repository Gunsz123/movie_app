import React from "react";

const MovieCard = ({ movie, darkMode }) => {
  const { title, overview, release_date, popularity, vote_count, poster_path } = movie;

  return (
    <div
      className={`font-mono shadow-lg rounded-lg overflow-hidden w-full md:w-80 lg:w-80 lg:h-1110 transition-transform hover:scale-105 ${
        darkMode ? "bg-white" : "bg-neutral-900"
      }`}>
      <img
        className="font-mono w-full h-56 object-cover object-center"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "path_to_placeholder_image"
        }
        alt={title}
      />
      <div className="font-mono p-4">
        <h2
          className={`font-mono text-xl font-semibold mb-2 overflow-hidden overflow-ellipsis max-h-20 truncate ${
            darkMode ? "text-black" : "text-white"
          }`}>
          {title}
        </h2>
        <p
          className={`font-mono overflow-hidden overflow-ellipsis max-h-32 truncate ${
            darkMode ? "text-black" : "text-white"
          }`}>
          {overview}
        </p>
        <p className="font-mono mt-4 text-orange-700">
          Release date: {new Date(release_date).toLocaleDateString()}
        </p>
        <h4 className="font-mono text-orange-700">Popularity: {Math.round(popularity)}</h4>
        {vote_count > 0 && <h2 className="font-mono text-orange-700">Votes: {vote_count}</h2>}
      </div>
    </div>
  );
};

export default MovieCard;
