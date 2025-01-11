// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// const MoviePage = ({ params }) => {
//   const { movie_id } = params;
//   const user_id = 2; // Your current user ID

//   const [movie, setMovie] = useState({});
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [editingReview, setEditingReview] = useState(null);

//   const handleSubmitReview = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/review/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           user_id: user_id.toString(),
//           movie_id: movie_id.toString(),
//           rating: rating.toString(),
//           review_text: reviewText,
//         }),
//       });

//       if (response.ok) {
//         console.log("Review submitted successfully!");
//         setRating(0);
//         setReviewText("");
//         fetchReviews(); // Refresh reviews after submission
//       } else {
//         console.error("Failed to submit review.");
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   const handleUpdateReview = async (reviewId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/review/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           review_id: reviewId,
//           user_id: user_id,
//           rating: rating,
//           review_text: reviewText,
//         }),
//       });

//       if (response.ok) {
//         console.log("Review updated successfully!");
//         setRating(0);
//         setReviewText("");
//         setEditingReview(null);
//         fetchReviews(); // Refresh reviews after update
//       } else {
//         console.error("Failed to update review.");
//       }
//     } catch (error) {
//       console.error("Error updating review:", error);
//     }
//   };

//   const startEditing = (review) => {
//     setEditingReview(review.review_id);
//     setRating(review.rating);
//     setReviewText(review.review_text);
//   };

//   const cancelEditing = () => {
//     setEditingReview(null);
//     setRating(0);
//     setReviewText("");
//   };

//   const fetchReviews = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/review/${movie_id}`
//       );
//       const data = await response.json();
//       setReviews(data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/movies/${movie_id}`
//         );
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovie();
//     fetchReviews();
//   }, [movie_id]);

//   return (
//     <div className="p-10 flex flex-col w-full m-auto">
//       <div className="flex gap-10 maxw-[800px] mt-10">
//         <div>
//           <Image
//             src={movie.poster_photo}
//             width={500}
//             height={800}
//             alt="movie"
//             className="w-[450px] h-full rounded-3xl shadow-lg object-cover border border-gray-600"
//           />
//         </div>
//         <div className="flex flex-col gap-2 text-gray-200">
//           <h1 className="text-5xl font-bold pb-4">{movie.title}</h1>
//           <p className="mt-2">Movie type: {movie.genre}</p>
//           <p>
//             Release Date:{" "}
//             {movie.release_date && new Date(movie.release_date)
//               .toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })
//               .replace(/(\d+)(?:st|nd|rd|th)/, "$1")}
//           </p>
//           <p>Director: {movie.director}</p>
//           <p className="max-w-[700px] text-gray-400 mt-10">{movie.synopsis}</p>
//         </div>

//         {/* Rating and Review Form */}
//         <div className="w-96">
//           <div className="mt-8"></div>
//           <h3 className="text-xl font-semibold mb-4">
//             {editingReview ? "Edit your review" : "Rate this movie"}
//           </h3>
//           <div className="flex gap-2 mb-4">
//             {[...Array(10)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setRating(index + 1)}
//                 className={`text-2xl ${
//                   index < rating ? "text-yellow-400" : "text-gray-500"
//                 }`}
//               >
//                 ★
//               </button>
//             ))}
//           </div>
//           <textarea
//             className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 text-gray-200"
//             rows="4"
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//           {editingReview ? (
//             <div className="flex gap-2">
//               <button
//                 className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 onClick={() => handleUpdateReview(editingReview)}
//               >
//                 Update Review
//               </button>
//               <button
//                 className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//                 onClick={cancelEditing}
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               onClick={handleSubmitReview}
//             >
//               Submit Review
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold text-gray-200 mb-6">Reviews</h2>
//         <div className="space-y-6">
//           {reviews.map((review) => (
//             <div
//               key={review.review_id}
//               className="bg-gray-800 p-6 rounded-lg border border-gray-700"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="flex gap-2 mb-2">
//                     {[...Array(10)].map((_, index) => (
//                       <span
//                         key={index}
//                         className={`text-2xl ${
//                           index < review.rating
//                             ? "text-yellow-400"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-gray-300">{review.review_text}</p>
//                 </div>
//                 {review.user_id === user_id && (
//                   <button
//                     onClick={() => startEditing(review)}
//                     className="text-blue-400 hover:text-blue-300"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;



"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const MoviePage = ({ params }) => {
  const { movie_id } = params;

  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = async () => {
    const user_id = 2; 

    try {
      const response = await fetch(`http://localhost:5000/api/review/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_id: user_id.toString(),
          movie_id: movie_id.toString(),
          rating: rating.toString(),
          review_text: reviewText,
        }),
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        setRating(0);
        setReviewText("");
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/${movie_id}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovie();
  }, [movie_id]);

  return (
    <div className="p-10 flex w-full m-auto">
      <div className="flex gap-10 maxw-[800px] mt-10">
        <div>
          <Image
            src={movie.poster_photo}
            width={500}
            height={800}
            alt="movie"
            className="w-[450px] h-full rounded-3xl shadow-lg object-cover border border-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2 text-gray-200">
          <h1 className="text-5xl font-bold pb-4">{movie.title}</h1>
          <p className="mt-2">Movie type: {movie.genre}</p>
          <p>
            Release Date:{" "}
            {new Date(movie.release_date)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
              .replace(/(\d+)(?:st|nd|rd|th)/, "$1")}
          </p>
          <p>Director: {movie.director}</p>
          <p className="max-w-[700px] text-gray-400 mt-10">{movie.synopsis}</p>
        </div>

        {/* Rating and Review Form */}
        <div>
          <div className="mt-8"></div>
          <h3 className="text-xl font-semibold mb-4">Rate this movie</h3>
          <div className="flex gap-2 mb-4">
            {[...Array(10)].map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className={`text-2xl ${
                  index < rating ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 text-gray-200"
            rows="4"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmitReview}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;




// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// const MoviePage = ({ params }) => {
//   const { movie_id } = params;
//   const user_id = 2; // Your current user ID

//   const [movie, setMovie] = useState({});
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState("");
//   const [existingReview, setExistingReview] = useState(null);

//   // Fetch user's existing review if any
//   const fetchUserReview = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/review/${movie_id}`
//       );
//       const data = await response.json();
      
//       if (data) {
//         setExistingReview(data || "");
//         setRating(data.rating || "");
//         setReviewText(data.review_text || "");
//       }
//     } catch (error) {
//       console.error("Error fetching user review:", error);
//     }
//   };

//   // Handle both submit and update in one function
//   const handleReviewSubmit = async () => {
//     const isUpdate = existingReview !== null;
    
//     try {
//       const response = await fetch(`http://localhost:5000/api/review/`, {
//         method: isUpdate ? "PATCH" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: user_id,
//           movie_id: movie_id,
//           rating: rating,
//           review_text: reviewText,
//           ...(isUpdate && { review_id: existingReview.review_id })
//         }),
//       });

//       if (response.ok) {
//         console.log(`Review ${isUpdate ? 'updated' : 'submitted'} successfully!`);
//         // Update the existing review data
//         setExistingReview({
//           ...existingReview,
//           rating,
//           review_text: reviewText
//         });
//       } else {
//         console.error(`Failed to ${isUpdate ? 'update' : 'submit'} review.`);
//       }
//     } catch (error) {
//       console.error(`Error ${isUpdate ? 'updating' : 'submitting'} review:`, error);
//     }
//   };

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/movies/${movie_id}`
//         );
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovie();
//     fetchUserReview(); // Fetch user's review when component mounts
//   }, [movie_id]);

//   return (
//     <div className="p-10 flex w-full m-auto">
//       <div className="flex gap-10 maxw-[800px] mt-10">
//         {/* Movie Image Section */}
//         <div>
//           <Image
//             src={movie.poster_photo}
//             width={500}
//             height={800}
//             alt="movie"
//             className="w-[450px] h-full rounded-3xl shadow-lg object-cover border border-gray-600"
//           />
//         </div>

//         {/* Movie Details Section */}
//         <div className="flex flex-col gap-2 text-gray-200">
//           <h1 className="text-5xl font-bold pb-4">{movie.title}</h1>
//           <p className="mt-2">Movie type: {movie.genre}</p>
//           <p>
//             Release Date:{" "}
//             {movie.release_date && new Date(movie.release_date)
//               .toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long",
//                 year: "numeric",
//               })
//               .replace(/(\d+)(?:st|nd|rd|th)/, "$1")}
//           </p>
//           <p>Director: {movie.director}</p>
//           <p className="max-w-[700px] text-gray-400 mt-10">{movie.synopsis}</p>
//         </div>

//         {/* Rating and Review Form */}
//         <div>
//           <div className="mt-8"></div>
//           <h3 className="text-xl font-semibold mb-4">
//             {existingReview ? "Update your review" : "Rate this movie"}
//           </h3>
//           <div className="flex gap-2 mb-4">
//             {[...Array(10)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setRating(index + 1)}
//                 className={`text-2xl ${
//                   index < rating ? "text-yellow-400" : "text-gray-500"
//                 }`}
//               >
//                 ★
//               </button>
//             ))}
//           </div>
//           <textarea
//             className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 text-gray-200"
//             rows="4"
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//           <button
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             onClick={handleReviewSubmit}
//           >
//             {existingReview ? "Update Review" : "Submit Review"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;