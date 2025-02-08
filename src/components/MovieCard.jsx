import StarSVG from "./StarSVG"

function MovieCard({ movieData, onClick }) {
  const imgPath = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available";

  return (
    <div className="flex w-full flex-col rounded" onClick={onClick}>
      <figure className="relative overflow-hidden rounded-xl">
        <img
          src={imgPath}
          alt={movieData.title || "Movie Poster"}
          className="h-72 w-full rounded-xl object-cover"
        />
      </figure>
      <p className="mt-2 truncate text-base font-bold text-black">
        {movieData.title}
      </p>
      <p className="flex flex-row justify-between text-sm text-gray-400">
        <span>{movieData.release_date || ""}</span>
        <span className="flex flex-row items-center gap-1">
          <StarSVG />
          {String(movieData.vote_average).slice(0, 3)}
        </span>
      </p>
    </div>
  );
}

export default MovieCard;
