"use client";
import MovieCardAdmin from "@/app/components/HomePageComponents/MovieCardAdmin";
import TrendingMoviesSkeletonLoader from "@/app/components/SkeletonLoader/TrendingMoviesSkeletonLoader";
import Link from "next/link";
import { useEffect, useState } from "react";

const Deshboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/movies`
        );
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
    <>
      <div
        className="w-full h-full bg-gray-100  bg-cover bg-center "
        style={{
          backgroundImage: "url('/stock-image/bg.png')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className=" w-full min-h-screen backdrop-filter backdrop-blur-lg bg-gray-500 bg-opacity-50 inset-0 p-6">
          <p className="text-3xl font-semibold">Deshboard</p>

          <div className="flex items-center mt-8 flex-wrap gap-6  scrollbar-hide">
            {isLoading ? (
              <TrendingMoviesSkeletonLoader />
            ) : (
              movies.map((movie) => (
               
                  <MovieCardAdmin
                    key={movie.movie_id}
                    movieId={movie.movie_id}
                    posterImage={movie.poster_photo || "/stock-image/mov-4.jpg"}
                    movieName={movie.title}
                    rating={movie.rating}
                    releaseYear={movie.release_date}
                  />
              
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Deshboard;
