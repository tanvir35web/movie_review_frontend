"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import nookies from "nookies";
import { useRouter } from "next/navigation";

const MoviePage = ({ params }) => {
  const { movie_id } = params;

  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewExists, setReviewExists] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [allUserReviews, setAllUserReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const cookies = nookies.get();
  const user_id = cookies["user_id"];

  const handleSubmitReview = async () => {
    const method = reviewExists ? "PATCH" : "POST";
    const endpoint = `http://localhost:5000/api/review`;

    const bodyData = {
      user_id: user_id.toString(),
      movie_id: movie_id.toString(),
      rating: rating.toString(),
      review_text: reviewText,
    };

    if (reviewExists && reviewId) {
      bodyData.review_id = reviewId.toString();
    }

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bodyData),
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        setSuccessMessage("Review submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
        setIsEditMode(false);
        setReviewExists(true);
        fetchReview();
      } else {
        console.error("Failed to submit review.");
        setSuccessMessage(
          "Error, Make sure all fields are filled properly. please try again !"
        );
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setSuccessMessage(error);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/movies/${movie_id}`
      );
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/${movie_id}`,
        {
          headers: { user_id: user_id },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const review = data[0];
          setRating(review.rating);
          setReviewText(review.review_text);
          setReviewExists(true);
          setReviewId(review.review_id);
        }
        fetchAllReviewsForSelectedMovie();
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const fetchAllReviewsForSelectedMovie = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/review/all/${movie_id}`
      );
      if (response.ok) {
        const data = await response.json();
        setAllUserReviews(data);
        // fetchReview();
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchReview();
    fetchAllReviewsForSelectedMovie();
  }, [movie_id, reviewId, user_id]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <svg
          className="animate-spin h-20 w-20 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
          ></path>
        </svg>
      </div>
    );
  } else {
    return (
      <>
        <div className="container m-auto">
          <div className="p-10  w-full">
            <div className="flex flex-col gap-10  mt-10">
              <div className=" flex gap-16">
                <div>
                  <Image
                    src={movie.poster_photo || "/stock-image/mov-11.jpg"}
                    width={500}
                    height={800}
                    alt="movie"
                    className="w-[550px] h-full rounded-3xl shadow-lg object-cover border border-gray-600"
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
                  <p className="max-w-[1100px] text-gray-400 mt-10 max-h-[500px] overflow-y-auto p-4 rounded-xl bg-gray-700 bg-opacity-35 leading-[25px] text-justify">
                    {movie.synopsis}
                  </p>
                </div>
              </div>

              {/* Rating and Review Form */}
              <div>
                <div className="mt-8"></div>
                <h3 className="text-xl font-semibold mb-4">
                  {reviewExists && !isEditMode
                    ? "Your review"
                    : "Rate this movie"}
                </h3>
                <div className="flex gap-2 mb-4">
                  {[...Array(10)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setRating(index + 1)}
                      className={`text-2xl ${
                        index < rating ? "text-yellow-400" : "text-gray-500"
                      }`}
                      // disabled={!isEditMode && reviewExists}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 text-gray-200"
                  rows="6"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  disabled={!isEditMode && reviewExists}
                />
                <div className="flex flex-col">
                  <button
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={
                      reviewExists
                        ? () => setIsEditMode(!isEditMode)
                        : handleSubmitReview
                    }
                  >
                    {isEditMode
                      ? "Cancel edit"
                      : reviewExists
                      ? "Edit Review"
                      : "Submit Review"}
                  </button>
                  {isEditMode && (
                    <button
                      className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      onClick={handleSubmitReview}
                    >
                      Update Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* users review list  */}
          <>
            <div className="px-10 ">
              {allUserReviews &&
                allUserReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-500 bg-opacity-35 shadow-md rounded-lg p-4 mb-4 flex justify-between"
                  >
                    <div>
                      <div className="font-bold text-lg pb-3">
                        {review.username}
                      </div>
                      <div className="text-gray-400 max-w-[1150px]  text-justify pb-3">
                        {review.review_text}
                      </div>
                    </div>
                    <div>
                      <div className="text-white pb-3 font-bold text-xl text-right">
                        {review.rating}/10
                      </div>

                      {Array(review.rating)
                        .fill()
                        .map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                    </div>
                  </div>
                ))}
              <p
                onClick={() => router.push("/")}
                className="mt-6 cursor-pointer bg-gray-600 duration-200 hover:bg-gray-700 py-2 px-4 rounded w-fit mb-8"
              >
                Back to Home
              </p>
            </div>
          </>

          {successMessage && (
            <p className="fixed top-3 right-4 mt-4 bg-gray-700 py-2 px-4 rounded ">
              {successMessage}
            </p>
          )}
        </div>
      </>
    );
  }
};

export default MoviePage;
