import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";


const HomeComponents = () => {
    return (
        <>
            <div className="w-full h-screen bg-gray-100  bg-cover bg-center"
                style={{ backgroundImage: "url('/stock-image/bg.png')" }}>
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
                            <div className="relative w-[40%] h-auto rounded-3xl shadow-lg">
                                <Image src="/stock-image/hero-1.jpg" width={400} height={300} alt="bannar" className="w-full h-auto rounded-3xl shadow-lg " />
                                <h1 className="absolute bottom-4 text-right right-5 text-5xl font-bold">Your Trusted Guide to Movies</h1>
                            </div>
                            <div className="relative w-[70%] h-[380px] bg-gray-900 bg-opacity-30 rounded-3xl shadow-lg flex items-center justify-center">
                                <Image src="/stock-image/hero-2.jpg" width={400} height={380} alt="banner" className="absolute left-0 h-full w-auto rounded-l-3xl shadow-lg  transition-transform duration-500 ease-in-out transform hover:translate-x-full" />
                                <h1 className="text-white text-2xl font-bold z-10 p-4 text-right max-w-[60%] absolute right-4">Discover the best movies, read honest reviews, and share your thoughts with a global community of movie enthusiasts.</h1>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-gray-900 opacity-100 rounded-3xl z-2"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeComponents;