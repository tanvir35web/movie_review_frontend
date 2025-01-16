"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Link from "next/link";
import TrendingMoviesSkeletonLoader from "../SkeletonLoader/TrendingMoviesSkeletonLoader";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/movies`);
        const data = await response.json();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mt-20">Trending Movies</h1>
        <div className="flex items-center space-x-6 mt-6 overflow-x-auto scrollbar-hide">
          {isLoading ? (
            <TrendingMoviesSkeletonLoader />
          ) : (
            movies.map((movie) => (
              <Link href={`/${movie.movie_id}`} key={movie.movie_id}>
                <MovieCard
                  key={movie.movie_id}
                  posterImage={movie.poster_photo || "/stock-image/mov-4.jpg"}
                  movieName={movie.title}
                  rating={movie.rating}
                  releaseYear={movie.release_date}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
