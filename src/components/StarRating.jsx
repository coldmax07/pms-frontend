const StarRating = ({ rating, setRating }) => (
  <div>
    {[1, 2, 3, 4, 5].map((n) => (
      <i
        key={n}
        className={`bi ${n <= rating ? 'bi-star-fill text-primary' : 'bi-star text-secondary'} me-1`}
        role="button"
        aria-label={`rate ${n}`}
        tabIndex={0}
        onClick={() => setRating(n)}
        onKeyDown={(e) => e.key === 'Enter' && setRating(n)}
      ></i>
    ))}
  </div>
);

export default StarRating;
