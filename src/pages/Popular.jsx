import { useEffect } from "react";
import { useState } from "react";

// Leaked intentionally
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";
const POPULAR_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=5&sort_by=popularity.desc";

function StarSVG() {
  return (
    <svg
      className="size-4 fill-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
}

function MovieCard({ movieData }) {
  const imgPath = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available";

  return (
    <div className="flex w-full flex-col rounded">
      <figure className="relative overflow-hidden rounded-xl">
        <img
          src={imgPath}
          alt={movieData.name || "Movie Poster"}
          className="h-72 w-full rounded-xl object-cover"
        />
      </figure>
      <p className="mt-2 truncate text-base font-bold text-black">
        {movieData.name}
      </p>
      <p className="flex flex-row justify-between text-sm text-gray-400">
        <p>{movieData.first_air_date}</p>
        <p className="flex flex-row items-center gap-1">
          <StarSVG />
          {String(movieData.vote_average).slice(0, 3)}
        </p>
      </p>
    </div>
  );
}

function Popular() {
  let [loading, setLoading] = useState(true);
  let [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL, {
      method: "get",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h1 className="self-center text-xl text-black">Loading</h1>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-6 scroll-smooth">
            {data.results.map((res, _) => (
              <MovieCard movieData={res} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Popular;
