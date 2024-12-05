import MovieCard from "./MovieCard";

function MovieList({ movieData }) {
  return (
    <>
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-4 scroll-smooth">
          {movieData.results.map((res, _) => (
            <MovieCard
              key={res.name}
              movieData={res}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieList;
