import React from "react";
import { v4 as uuid } from "uuid";
import { useTrivia } from "./hooks";

const cache = {};

function App({ ID }) {
  const [movieID, setMovieID] = React.useState("");
  const { trivia, id, loading, setId, setLoading } = useTrivia({ ID, cache });

  const handleMovieIDChange = (event) => setMovieID(event.target.value);

  const handleSearchByMovieID = () => {
    if (movieID !== id) {
      setLoading(true);
      setId(movieID);
    }
  };

  // if (process.env.NODE_ENV === "development") console.log("render");
  return (
    <>
      <input type="text" value={movieID} onChange={handleMovieIDChange} />
      <button onClick={handleSearchByMovieID} type="button">
        Search
      </button>
      {!loading && trivia.trivia && trivia.trivia.length > 0 ? (
        trivia.trivia.map((trivia) => <p key={uuid()}>{trivia}</p>)
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default App;
