import { useState } from "react";
import Image from "next/image";

const MovieCardAdmin = ({ posterImage, movieName, movieId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEdit = async () => {
    const editApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`;
    try {
      const response = await fetch(editApiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* Update data here */ }),
      });
      if (response.ok) {
        alert("Movie updated successfully!");
        // Add any additional logic here
      } else {
        alert("Failed to update movie!");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleDelete = async () => {
    const deleteApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`;
    try {
      const response = await fetch(deleteApiUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Movie deleted successfully!");
      } else {
        alert("Failed to delete movie!");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 relative">
        <div className="relative w-[200px] h-[250px] bg-gray-900 bg-opacity-30 rounded-xl shadow-lg">
          <Image
            src={posterImage}
            width={400}
            height={600}
            alt="movie"
            className="w-full h-full rounded-xl shadow-lg object-cover"
          />
          {/* 3-dot icon */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="absolute top-2 right-2 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5.25h.008v.008H12v-.008zM12 12h.008v.008H12v-.008zM12 18.75h.008v.008H12v-.008z"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute top-10 right-2 bg-white shadow-lg rounded-md w-32 z-10">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="mt-1 flex flex-col space-y-1 pl-2">
          <p className="text-xl font-semibold">{movieName}</p>
        </div>
      </div>
    </>
  );
};

export default MovieCardAdmin;
