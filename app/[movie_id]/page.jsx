"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import nookies from "nookies";

const MoviePage = ({ params }) => {
  const { movie_id } = params;

  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewExists, setReviewExists] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
      const response = await fetch(
        `http://localhost:5000/api/movies/${movie_id}`
      );
      const data = await response.json();
      setMovie(data);
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
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchReview();
  }, [movie_id, reviewId, user_id]);

  return (
    <div className="p-10 flex w-full m-auto">
      <div className="flex gap-10 maxw-[800px] mt-10">
        <div>
          <Image
            src={movie.poster_photo || "/stock-image/mov-11.jpg"}
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
          <h3 className="text-xl font-semibold mb-4">
            {reviewExists && !isEditMode ? "Your review" : "Rate this movie"}
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
            rows="4"
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

          {successMessage && (
            <p className="fixed top-3 right-4 mt-4 bg-gray-700 py-2 px-4 rounded ">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
