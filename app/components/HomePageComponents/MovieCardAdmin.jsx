import Image from "next/image";
import { MdDelete } from "react-icons/md";

const MovieCardAdmin = ({
  posterImage,
  movieName,
  movieId,
  releaseYear,
  genre,
}) => {
  const handleDelete = async () => {
    const deleteApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`;
    try {
      const response = await fetch(deleteApiUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Movie deleted successfully!");
        window.location.reload();
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
        <div className="mt-1 flex space-x-4 p-2 rounded-xl bg-gray-500 bg-opacity-70 backdrop-blur-xl w-[400px]  shadow-lg border border-gray-300  border-opacity-15 hover:border-opacity-45 duration-200">
          <Image
            src={posterImage}
            width={50}
            height={70}
            alt="movie"
            className="w-[70px] h-[90px] rounded-lg shadow-lg object-cover"
          />
          <div className="max-w-[177px] w-full">
            <p className="text-lg font-semibold">{movieName}</p>
            <p className="text-sm ">{genre}</p>
            <p className="text-sm mt-2">
              {new Date(releaseYear)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                .replace(/(\d+)(?:st|nd|rd|th)/, "$1")}
            </p>
          </div>
          <div className=" ps-16 flex items-end justify-center flex-col gap-1">
            <p
              className="hover:bg-red-700  p-2 rounded-md cursor-pointer duration-200"
              onClick={handleDelete}
            >
              <MdDelete size={20} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCardAdmin;
