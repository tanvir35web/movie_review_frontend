"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterFile, setPosterFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleFileChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

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
      setMessage("Movie added successfully!");

      // Reset form fields
      setTitle("");
      setGenre("");
      setReleaseDate("");
      setDirector("");
      setSynopsis("");
      setPosterFile(null);
    } catch (error) {
      setLoading(false);
      setError("Error adding movie. Please try again.");
      console.error("Error:", error);
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 ">
      <h2 className="text-3xl font-bold mb-12 mt-2">Add a New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Movie Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Director</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Synopsis</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
            rows="9"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Movie Poster </label>
          <input
            type="file"
            name="poster_photo"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="w-full p-2 border rounded-md border-gray-700 bg-slate-800"
          />
        </div>
        <div className="flex gap-3 items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 duration-200 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Movie"}
          </button>
          <p
            onClick={() => router.push("/deshboard")}
            className="bg-gray-400 bg-opacity-40 py-2 px-4 rounded cursor-pointer hover:bg-opacity-30 duration-150"
          >
            Back to deshboard
          </p>
        </div>
      </form>

      <div className="mt-2">
        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>

    </div>
  );
};

export default CreateMovie;
