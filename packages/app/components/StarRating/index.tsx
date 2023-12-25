import React from 'react';
export interface IStarProps {
  rating: number;
}
const StarRating: React.FC<IStarProps> = ({rating}) => {
  const normalizedRating = Math.max(Math.min(rating, 5), 1);

  const stars = Array.from({length: normalizedRating}, (_, index) => (
    <span key={index} role="img" aria-label="star" className="star">
      ⭐
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
