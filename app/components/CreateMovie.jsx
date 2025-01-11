"use client";

import { useState } from "react";
import axios from "axios";

const CreateMovie = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [director, setDirector] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [posterFile, setPosterFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setPosterFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("genre", genre);
        formData.append("release_date", releaseDate);
        formData.append("director", director);
        formData.append("synopsis", synopsis);
        if (posterFile) {
            formData.append("poster_photo", posterFile);
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Error adding movie. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 ">
            <h2 className="text-3xl font-bold mb-16 mt-2">Add a New Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Movie Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Genre</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Release Date</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Director</label>
                    <input
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Synopsis</label>
                    <textarea
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                        rows="9"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Movie Poster </label>
                    <input
                        type="file"
                        name="poster_photo"
                        onChange={handleFileChange}
                        accept="image/*"
                        // required
                        className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Create Movie"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateMovie;
