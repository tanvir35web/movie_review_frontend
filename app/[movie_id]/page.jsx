import React from 'react';

const MoviePage = ({ params }) => {
  const { movie_id } = params;

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {movie_id}</p>
    </div>
  );
};

export default MoviePage;