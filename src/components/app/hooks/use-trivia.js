import React from "react";

/**
 * @author 109149
 * @time Fri 12 Mar 2021 01:10:51 +04
 *
 * Fetches trivia from server.
 *
 * @param {string} ID is the movie id.
 * @param {object} cache is the fetched trivia to cache.
 * @return {object} trivia, id, loading, setId, setLoading.
 */
const useTrivia = ({ ID, cache }) => {
  const [trivia, setTrivia] = React.useState({}); // {trivia, spoilers}
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState(ID);

  React.useEffect(() => {
    // if (process.env.NODE_ENV === "development") console.log("useTrivia Effect");
    if (id) {
      if (!cache[id]) {
        fetch(`/trivia/${id}`)
          .then((response) => response.json())
          .then((response) => {
            cache[id] = {
              ...cache[id],
              trivia: response.trivia,
              spoilers: response.spoilers,
            };
            setTrivia(response);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      } else {
        setTrivia({ trivia: cache[id].trivia, spoilers: cache[id].spoilers });
        setLoading(false);
      }
    }
  }, [id, cache]);

  return { trivia, id, loading, setId, setLoading };
};

export default useTrivia;
