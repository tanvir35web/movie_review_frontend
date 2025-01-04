"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/movies/")
            .then((response) => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the movies data!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {movies.map((movie) => (
                <div key={movie.movie_id} className="bg-slate-700 p-4 rounded shadow-lg">
                    <img src={movie.poster_photo} alt={movie.title} className="w-full h-64 object-cover rounded mb-4" />
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="text-gray-500">{movie.genre}</p>
                    <p className="text-sm text-gray-700 mt-2">{movie.synopsis}</p>
                    <div className="mt-4 text-sm text-gray-500">
                        <p><strong>Director:</strong> {movie.director}</p>
                        <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Movies;
