"use client";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { GiAbstract057 } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { SiBigcartel } from "react-icons/si";
import { FaDAndD } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import FilterCard from "./FilterCard";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TreandingMovies from "./TreandingMovies";
import nookies from "nookies";
import TopRatedMovies from "./TopRatedMovies";
import Search from "./Search";
import { FaUserAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const HomeComponents = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  const cookies = nookies.get();
  const user_id = cookies["user_id"];
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/${user_id}`
        );
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  function toggleProfileDropdownMenu() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div className=" w-full h-full backdrop-filter backdrop-blur-lg bg-gray-500 bg-opacity-50 inset-0 p-6">
          <div className=" w-full flex m-auto  items-center">
            <div>
              <h1 className="font-bold text-2xl ">MOVIE-REVIEW</h1>
            </div>

            <Search />

            {/* profile section  */}
            <div className="flex items-center space-x-2 px-3  p-1 relative">
              <div className="bg-gray-900 bg-opacity-30 hover:bg-opacity-45 duration-200 rounded-full p-2 cursor-pointer">
                <IoMdNotifications size={24} />
              </div>

              <div
                onClick={toggleProfileDropdownMenu}
                className="cursor-pointer "
              >
                <div className="rounded-full w-10 h-10  bg-gray-900 bg-opacity-30 hover:bg-opacity-45 duration-200 flex items-center justify-center">
                  <FaUserAlt size={20} />
                </div>
              </div>

              {/* user dropdown menu  */}
              <div>
                {isProfileMenuOpen && userInfo && (
                  <div
                    ref={profileMenuRef}
                    className="absolute top-14 right-0 z-20 w-[350px] h-[270px] bg-gray-500 backdrop-blur-xl bg-opacity-95 rounded-2xl border border-gray-400 p-4 shadow-xl"
                  >
                    <div className="relative">
                      <div className="flex bg-gray-400 p-2 items-center bg-opacity-30 gap-4 rounded-xl">
                        <div className="">
                          <div className="rounded-2xl  w-16 h-16  bg-gray-900 bg-opacity-30 flex items-center justify-center">
                            <FaUserAlt size={30} />
                          </div>
                        </div>
                        <div>
                          <p className="">{userInfo.username || ""}</p>
                          <p className=" mt-2 text-sm">
                            User Type :{" " + userInfo.role || ""}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-400 p-2 mt-2 rounded-xl bg-opacity-30">
                        <p className="text-sm ps-1">
                          Review Points: {userInfo?.review_count}{" "}
                        </p>
                      </div>

                      {userInfo && userInfo?.role === "admin" && (
                        <div className="bg-gray-400 hover:bg-gray-600 duration-200 p-2 mt-2 rounded-xl bg-opacity-30 cursor-pointer"
                        onClick={() => router.push('/deshboard')}>
                          <p className="text-sm ps-1 flex items-center gap-1">
                            {" "}
                            <span>
                              <MdSpaceDashboard />
                            </span>{" "}
                            Deshboard
                          </p>
                        </div>
                      )}

                      <p
                        className="absolute top-[198px] w-full bg-red-700 hover:bg-red-800 duration-150 cursor-pointer text-white px-4 py-2 rounded-xl text-center"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* bannar section  */}
          <div className="mt-16">
            <div className="flex items-center space-x-4">
              <div className="relative w-[40%] h-[380px] rounded-3xl shadow-lg">
                <Image
                  src="/stock-image/hero-1.jpg"
                  width={400}
                  height={300}
                  alt="bannar"
                  className="w-full h-full object-cover rounded-3xl shadow-lg "
                />
                <h1 className="absolute bottom-4 text-right right-5 text-5xl font-bold">
                  Your Trusted Guide to Movies
                </h1>
              </div>
              <div className="relative w-[70%] h-[380px] bg-gray-900 bg-opacity-30 rounded-3xl shadow-lg flex items-center justify-center">
                <Image
                  src="/stock-image/hero-2.jpg"
                  width={400}
                  height={380}
                  alt="banner"
                  className="absolute left-0 h-full w-auto rounded-l-3xl shadow-lg  transition-transform duration-500 ease-in-out transform hover:translate-x-full"
                />
                <h1 className="text-white text-2xl font-bold z-10 p-4 text-right max-w-[60%] absolute right-4">
                  Discover the best{" "}
                  <span className="text-red-600 text-[44px]">Movies</span>, read
                  honest{" "}
                  <span className="text-yellow-400 text-[40px]">Reviews</span>,
                  and share your thoughts with a global community of movie
                  enthusiasts.
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-gray-900 opacity-100 rounded-3xl z-2"></div>
                <div className="absolute right-7 bottom-5 flex items-center gap-5">
                  <Image
                    src="/stock-image/youtube-logo.png"
                    width={40}
                    height={30}
                    alt="banner"
                    className=" h-auto w-[50px] "
                  />
                  <Image
                    src="/stock-image/Netflix_N-logo.png"
                    width={40}
                    height={30}
                    alt="banner"
                    className=" h-[40px] w-[30px] "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling container section  */}
          <div className="relative overflow-hidden mt-10">
            <div className="flex w-full animate-infinite-scroll space-x-4">
              <div className="flex gap-4">
                <FilterCard icon={<FaFire />} label="Trending" />
                <FilterCard icon={<GiAbstract057 />} label="Action" />
                <FilterCard icon={<FaHeartbeat />} label="Romance" />
                <FilterCard icon={<SiBigcartel />} label="Animation" />
                <FilterCard icon={<FaDAndD />} label="Horror" />
                <FilterCard icon={<MdScience />} label="Science" />
                <FilterCard icon={<FaFire />} label="Comedy" />
                <FilterCard icon={<FaFire />} label="Miscellaneous" />
              </div>
              <div className="flex gap-4">
                <FilterCard icon={<FaFire />} label="Trending" />
                <FilterCard icon={<GiAbstract057 />} label="Action" />
                <FilterCard icon={<FaHeartbeat />} label="Romance" />
                <FilterCard icon={<SiBigcartel />} label="Animation" />
                <FilterCard icon={<FaDAndD />} label="Horror" />
                <FilterCard icon={<MdScience />} label="Science" />
                <FilterCard icon={<FaFire />} label="Comedy" />
                <FilterCard icon={<FaFire />} label="Miscellaneous" />
                <FilterCard icon={<FaDAndD />} label="Horror" />
                <FilterCard icon={<FaHeartbeat />} label="Romance" />
              </div>
            </div>
          </div>

          <TopRatedMovies />

          <TreandingMovies />

          {/* Footer Section   */}
          <div className="mt-16">
            <div className="relative w-full h-full rounded-3xl shadow-lg flex items-center justify-center">
              <Image
                src="/stock-image/mov-grid.jpg"
                width={1920}
                height={300}
                alt="footer"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-3xl"></div>
              <div className="absolute bottom-16 mx-auto flex flex-col gap-8 items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                  Explore our community of movie enthusiasts today!
                </h1>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className=" px-8 py-4 text-xl rounded-xl bg-black bg-opacity-40 border border-red-600 text-red-700 uppercase font-bold hover:scale-110 duration-300 hover:bg-opacity-60 tracking-wide">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponents;
