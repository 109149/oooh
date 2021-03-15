import React from "react";
import { useTrivia, useImageUrls } from "./hooks";
import Cards from "../cards/Cards";

/**
 * ID<String>: {
 *  trivia: Array<string>,
 *  spoilers: Array<string>,
 *  imageUrls: Array<string>,
 * }
 */

const cache = {};

function App({ ID }) {
  const [movieID, setMovieID] = React.useState("");
  const { id, loading, setId, setLoading } = useTrivia({ ID, cache });
  useImageUrls({ ID, cache });

  const handleMovieIDChange = (event) => setMovieID(event.target.value);

  const handleSearchByMovieID = () => {
    if (movieID !== id) {
      setLoading(true);
      setId(movieID);
      setMovieID("");
    }
  };

  // if (process.env.NODE_ENV === "development") console.log("render");
  return (
    <>
      <input type="text" value={movieID} onChange={handleMovieIDChange} />
      <button onClick={handleSearchByMovieID} type="button">
        Search
      </button>
      {!loading &&
      cache[id] &&
      cache[id].trivia &&
      cache[id].imageUrls &&
      cache[id].trivia.length > 0 ? (
        <Cards contents={cache[id]} />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default App;
