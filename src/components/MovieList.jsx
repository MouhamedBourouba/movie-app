import MovieCard from "./MovieCard";

function MovieList({ movieData, onClick }) {

  console.log(`${movieData}`)

  return (
    <>
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-4 scroll-smooth sm:grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))]">
          {movieData.results.map((res, _) => (
            <MovieCard
              key={res.id}
              movieData={res}
              onClick={() => onClick(res)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieList;
