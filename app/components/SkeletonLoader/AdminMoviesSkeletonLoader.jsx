const AdminMoviesSkeletonLoader = () => {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 items-start justify-center animate-pulse">
            <div className="bg-gray-400 bg-opacity-50 w-[400px] h-[110px] rounded-2xl"></div>
           
          </div>
        ))}
      </>
    );
  };
  
  export default AdminMoviesSkeletonLoader;
