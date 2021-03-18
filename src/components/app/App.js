import React from "react";
import { Cards, Loading, ThemeToggler } from "../";
import { useImageUrls, useTrivia } from "./hooks";

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
  let { ...imageUrlHookResult } = useImageUrls({ ID, cache });
  let { ...triviaHookResult } = useTrivia({ ID, cache });
  let loading = imageUrlHookResult.loading && triviaHookResult.loading;
  let id = triviaHookResult.id;

  // let imageUrlHookResult, triviaHookResult;
  // let id = "";
  // let loading = false;

  const handleMovieIDChange = (event) => setMovieID(event.target.value);

  const handleSearchByMovieID = () => {
    if (movieID !== id) {
      imageUrlHookResult.setLoading(true);
      triviaHookResult.setLoading(true);
      imageUrlHookResult.setId(movieID);
      triviaHookResult.setId(movieID);
      setMovieID("");
    }
  };

  if (process.env.NODE_ENV === "development") console.log("render");
  return (
    <>
      <input type="text" value={movieID} onChange={handleMovieIDChange} />
      <button onClick={handleSearchByMovieID} type="button">
        Search
      </button>
      <ThemeToggler />
      {!loading &&
      cache[id] &&
      cache[id].trivia &&
      cache[id].imageUrls &&
      cache[id].trivia.length > 0 ? (
        <Cards contents={cache[id]} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
