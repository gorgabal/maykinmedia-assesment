import React from 'react';

const Star = ({ filled }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

const StarRating = ({ label, rating, maxRating = 5 }) => {
  const filledStars = Math.round(parseFloat(rating));
  const stars = Array.from({ length: maxRating }, (_, i) => (
    <Star key={i} filled={i < filledStars} />
  ));

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-700 w-28">{label}</span>
      <div className="flex items-center">{stars}</div>
    </div>
  );
};

export default StarRating; 