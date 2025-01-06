import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { GiAbstract057 } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { SiBigcartel } from "react-icons/si";
import { FaDAndD } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import FilterCard from "./FilterCard";
import MovieCard from "./MovieCard";



const HomeComponents = () => {
    return (
        <>
            <div className="w-full h-full bg-gray-100  bg-cover bg-center "
                style={{
                    backgroundImage: "url('/stock-image/bg.png')",
                    backgroundAttachment: "fixed",
                }}>
                <div className=" w-full h-full backdrop-filter backdrop-blur-lg bg-gray-500 bg-opacity-50 inset-0 p-6">
                    <div className=" w-full flex m-auto  items-center">

                        <div>
                            <h1 className="font-bold text-2xl ">MOVIE-REVIEW</h1>
                        </div>

                        {/* search section  */}
                        <div className="relative bg-gray-900 w-[30%] h-12 rounded-full m-auto bg-opacity-30  ps-8 pr-16 py-3 ">
                            <input className=" outline-none bg-transparent w-full" placeholder="Search movie by name, type or year ..."></input>
                            <div>
                                <CiSearch className="absolute top-[17%] right-[3%]  cursor-pointer" size={30} />
                            </div>
                        </div>

                        {/* profile section  */}
                        <div className="flex items-center space-x-2 px-3  p-1">
                            <div className="bg-gray-900 bg-opacity-30 rounded-full p-2 cursor-pointer">
                                <IoMdNotifications size={24} />
                            </div>

                            <div>
                                <Image src="/stock-image/profile1.jpg" alt={"profile-photo"} height={40} width={40} className="rounded-full w-10 h-10 border-[0.5px] border-white border-opacity-30" />
                            </div>
                        </div>
                    </div>

                    {/* bannar section  */}
                    <div className="mt-16">
                        <div className="flex items-center space-x-4">
                            <div className="relative w-[40%] h-[380px] rounded-3xl shadow-lg">
                                <Image src="/stock-image/hero-1.jpg" width={400} height={300} alt="bannar" className="w-full h-full object-cover rounded-3xl shadow-lg " />
                                <h1 className="absolute bottom-4 text-right right-5 text-5xl font-bold">Your Trusted Guide to Movies</h1>
                            </div>
                            <div className="relative w-[70%] h-[380px] bg-gray-900 bg-opacity-30 rounded-3xl shadow-lg flex items-center justify-center">
                                <Image src="/stock-image/hero-2.jpg" width={400} height={380} alt="banner" className="absolute left-0 h-full w-auto rounded-l-3xl shadow-lg  transition-transform duration-500 ease-in-out transform hover:translate-x-full" />
                                <h1 className="text-white text-2xl font-bold z-10 p-4 text-right max-w-[60%] absolute right-4">Discover the best movies, read honest reviews, and share your thoughts with a global community of movie enthusiasts.</h1>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-gray-900 opacity-100 rounded-3xl z-2"></div>

                            </div>
                        </div>
                    </div>

                    {/* filter section  */}
                    <div className="mt-10 flex items-center space-x-4 overflow-x-auto scrollbar-hide">
                        <FilterCard icon={<FaFire />} label="Trending" />
                        <FilterCard icon={<GiAbstract057 />} label="Action" />
                        <FilterCard icon={<FaHeartbeat />} label="Romance" />
                        <FilterCard icon={<SiBigcartel />} label="Animation" />
                        <FilterCard icon={<FaDAndD />} label="Horror" />
                        <FilterCard icon={<MdScience />} label="Science" />
                        <FilterCard icon={<FaFire />} label="Comedy" />
                        <FilterCard icon={<FaFire />} label="Miscellaneous" />
                        <FilterCard icon={<FaFire />} label="Trending" />
                        <FilterCard icon={<GiAbstract057 />} label="Action" />
                        <FilterCard icon={<FaHeartbeat />} label="Romance" />
                        <FilterCard icon={<SiBigcartel />} label="Animation" />
                        <FilterCard icon={<FaDAndD />} label="Horror" />
                        <FilterCard icon={<MdScience />} label="Science" />
                        <FilterCard icon={<FaFire />} label="Comedy" />
                        <FilterCard icon={<FaFire />} label="Miscellaneous" />
                    </div>

                    {/* Treanding Movies Section   */}
                    <div>
                        <h1 className="text-2xl font-bold mt-10">Trending Movies</h1>
                        <div className="flex items-center space-x-6 mt-6 overflow-x-auto scrollbar-hide ">
                            <MovieCard posterImage="/stock-image/mov-4.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-5.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-3.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-8.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-2.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-1.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-7.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-8.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-9.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-10.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-11.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                        </div>
                    </div>

                    {/* Old Movies Section   */}
                    <div>
                        <h1 className="text-2xl font-bold mt-16">Trending Movies</h1>
                        <div className="flex items-center space-x-6 mt-6 overflow-x-auto scrollbar-hide ">
                            <MovieCard posterImage="/stock-image/mov-11.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-10.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-9.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-6.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-7.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-8.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-5.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-4.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-3.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-2.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                            <MovieCard posterImage="/stock-image/mov-1.jpg" movieName="The Shawshank Redemption" rating="9.3" releaseYear="1994" />
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="relative w-full h-full rounded-3xl shadow-lg">
                            <Image src="/stock-image/mov-grid.jpg" width={1920} height={300} alt="footer" className="w-full h-full object-cover rounded-3xl" />
                            <div className="absolute inset-0 bg-black opacity-65 rounded-3xl"></div>
                            <div className="absolute inset-0 flex flex-col gap-16 items-center justify-center">
                                <h1 className="text-white text-4xl font-bold">Join our community of movie enthusiasts today!</h1>
                                <button className=" px-8 py-4 text-xl rounded-xl bg-black bg-opacity-40 border border-blue-600 uppercase font-bold hover:scale-110 duration-300 hover:bg-opacity-60">Review Now</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
};

export default HomeComponents;