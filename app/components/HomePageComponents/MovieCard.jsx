import Image from "next/image";
import { SiReverbnation } from "react-icons/si";


const MovieCard = ({ posterImage, movieName, rating, releaseYear }) => {
    return (
        <>
            <div className="flex flex-col  gap-2 ">
                <div className="relative w-[400px] h-[600px] bg-gray-900 bg-opacity-30 rounded-3xl shadow-lg">
                    <Image src={posterImage} width={400} height={600} alt="movie" className="w-full h-full rounded-3xl shadow-lg" />
                </div>
                <div className=" mt-3 flex flex-col  space-y-2 pl-2">
                    <p className="text-2xl font-semibold">{movieName}</p>
                    <div className="w-full flex items-center space-x-8">
                        <div className="flex gap-2">
                            <span><SiReverbnation /></span>
                            <p>{rating}</p>
                        </div>
                        <p>{releaseYear}</p>
                    </div>
                </div>
            </div></>
    )
};

export default MovieCard;