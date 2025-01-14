"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Link from "next/link";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movies/top-rated"
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  console.log("movies:", movies);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mt-20">Most Rated Movies</h1>
        <div className="flex items-center space-x-6 mt-6 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
            <Link href={`/${movie.movie_id}`} key={movie.movie_id}>
              <MovieCard
                key={movie.movie_id}
                posterImage={movie.poster_photo || "/stock-image/mov-4.jpg"}
                movieName={movie.title}
                rating={movie.average_rating}
                releaseYear={movie.release_date}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedMovies;
