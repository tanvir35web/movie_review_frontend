const TrendingMoviesSkeletonLoader = () => {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 items-start justify-center animate-pulse">
            <div className="bg-gray-400 bg-opacity-50 w-[400px] h-[600px] rounded-2xl"></div>
            <div className="bg-gray-400 bg-opacity-50 h-6 w-[350px] rounded-md mt-2"></div>
            <div className="bg-gray-400 bg-opacity-50 h-5 w-[240px] rounded-md"></div>
          </div>
        ))}
      </>
    );
  };
  
  export default TrendingMoviesSkeletonLoader;
