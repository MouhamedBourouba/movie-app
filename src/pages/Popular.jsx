import { useEffect } from "react";
import { useState } from "react";

// Leaked intentionally
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";
const POPULAR_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc";

function Popular() {
  let [setLoading, loading] = useState(true);
  let [setData, data] = useState(null);

  useEffect(() => {
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
        <h1 className="text-xl text-black">Popular Page</h1>
      </div>
    </>
  );
}

export default Popular;
