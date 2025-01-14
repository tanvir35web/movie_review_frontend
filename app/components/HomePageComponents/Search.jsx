"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Debounce functionality to delay API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMovies();
        setIsMenuOpen(true);
      } else {
        setSearchResults([]);
        setIsMenuOpen(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search`,
        {
          params: { title: searchTerm },
        }
      );

      if (response.data.length === 0) {
        setSearchResults([]);
        setError("No movies found matching your search.");
      } else {
        setSearchResults(response.data);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative bg-gray-900 w-[30%] h-12 rounded-full m-auto bg-opacity-30 ps-8 pr-16 py-3">
        <input
          className="outline-none bg-transparent w-full placeholder:text-gray-200"
          placeholder="Search movie by name . . ."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsTyping(true);
          }}
        />
        <div onClick={fetchMovies}>
          <CiSearch
            className="absolute top-[17%] right-[3%] cursor-pointer"
            size={30}
          />
        </div>
      </div>

      <div className="w-full absolute top-16 z-30">
        {isMenuOpen && (
          <div
            ref={searchRef}
            className="mt-6 flex flex-col gap-4 bg-gray-500 bg-opacity-50 backdrop-blur-xl rounded-2xl w-full m-auto max-w-[600px] max-h-[600px] overflow-y-auto p-6 pr-5 shadow-2xl"
          >
            {loading && (
              <p className="text-center mt-4 text-gray-400">Searching...</p>
            )}
            {error && <p className="text-center mt-2 text-gray-50">{error}</p>}
            {searchResults &&
              searchResults.map((movie) => (
                <div
                  key={movie.movie_id}
                  className="bg-gray-800 bg-opacity-80 backdrop-blur-2xl p-4 rounded-2xl flex gap-4 cursor-pointer"
                  onClick={() => router.push(`/${movie.movie_id}`)} // Navigate on click
                >
                  <img
                    src={movie.poster_photo}
                    alt={movie.title}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="w-full">
                    <h3 className="mt-2 text-lg font-semibold">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400">{movie.genre}</p>
                    <p className="text-gray-400">{movie.director}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

