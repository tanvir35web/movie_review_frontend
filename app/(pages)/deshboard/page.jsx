"use client";
import MovieCardAdmin from "@/app/components/HomePageComponents/MovieCardAdmin";
import AdminMoviesSkeletonLoader from "@/app/components/SkeletonLoader/AdminMoviesSkeletonLoader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";


const Deshboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
 
  const handleDeshboardCountFetch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/movies/deshboard-counts`
      );
      const data = await response.json();
      setCount(data);
    } catch (error) {
      console.error("Error fetching deshboard count:", error);
    }
  };


  useEffect(() => {

    handleDeshboardCountFetch();
  }, []);

  const router = useRouter();

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

          <>
            <div className="flex gap-4 mt-6">
              <div className="bg-gray-800 bg-opacity-80 w-full h-[150px] rounded-2xl flex items-center justify-center flex-col gap-3 border border-gray-300  border-opacity-25 shadow-xl">
                <p className="text-2xl font-bold"> {count.movie_count} </p>
                <p>Total Number of Movie</p>
              </div>
              <div className="bg-gray-800 bg-opacity-80 w-full h-[150px] rounded-2xl flex items-center justify-center flex-col gap-3 border border-gray-300  border-opacity-25 shadow-xl">
                <p className="text-2xl font-bold"> {count.review_count} </p>
                <p>Total Number of Review</p>
              </div>
              <div className="bg-gray-800 bg-opacity-80 w-full h-[150px] rounded-2xl flex items-center justify-center flex-col gap-3 border border-gray-300  border-opacity-25 shadow-xl">
                <p className="text-2xl font-bold"> {count.user_count} </p>
                <p>Total Number of User</p>
              </div>
            </div>
          </>
          <>
            <p className="text-2xl font-bold py-4 mt-6">Movies</p>

            <div className="flex items-center flex-wrap gap-6  scrollbar-hide">
              {isLoading ? (
                <AdminMoviesSkeletonLoader />
              ) : (
                movies.map((movie) => (
                  <MovieCardAdmin
                    key={movie.movie_id}
                    movieId={movie.movie_id}
                    posterImage={movie.poster_photo || "/stock-image/mov-4.jpg"}
                    movieName={movie.title}
                    genre={movie.genre}
                    releaseYear={movie.release_date}
                  />
                ))
              )}
            </div>
          </>
          <p
            onClick={() => router.push("/create-movie")}
            className="z-20 absolute bottom-8 right-8 text-lg tracking-wide shadow-lg cursor-pointer hover:bg-opacity-95 duration-200 font-semibold mt-8 bg-gray-800 bg-opacity-75 p-4 px-7 rounded-xl border border-gray-300  border-opacity-25"
          >
            {" "}
            + Add Moive
          </p>

          <></>
          <p onClick={() => router.push("/")} className="w-fit flex items-center gap-2 text-lg tracking-wide shadow-lg cursor-pointer hover:bg-opacity-95 duration-200 font-semibold mt-8 bg-gray-800 bg-opacity-75 p-4 px-7 rounded-xl border border-gray-300  border-opacity-25"> <span><MdOutlineArrowBack />
          </span> Back to Home</p>
        </div>
      </div>
    </>
  );
};

export default Deshboard;
