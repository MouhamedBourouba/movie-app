import { useEffect } from "react";
import { useState } from "react";

// Leaked intentionally
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";
const POPULAR_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=5&sort_by=popularity.desc";

function MovieCard({ movieData }) {
  const imgPath = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image+Available"; // Fallback image

  return (
    <div className="flex w-full max-w-sm flex-col p-4">
      <figure className="relative overflow-hidden rounded-xl">
        <img
          src={imgPath}
          alt={movieData.name || "Movie Poster"}
          className="h-72 w-full rounded-xl object-cover"
        />
      </figure>
      <p className="mt-4 truncate text-xl font-semibold text-white">
        {movieData.name}
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
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6 scroll-smooth">
            {data.results.map((res, _) => (
              <div className="max-w-sm">
                <MovieCard movieData={res} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Popular;
