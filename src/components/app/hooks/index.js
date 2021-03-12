import React from "react";

/**
 * @author 109149
 * @time Fri 12 Mar 2021 01:10:51 +04
 *
 * Fetches trivia from server.
 *
 * @param {string} ID is the movie id.
 * @param {object} cache is the fetched trivia to cache.
 * @returns {tuple} tuple of trivia, id, loading, setId and setLoading.
 */
const useTrivia = ({ ID, cache }) => {
  const [trivia, setTrivia] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState(ID);

  React.useEffect(() => {
    if (id) {
      if (!cache[id]) {
        fetch(`/trivia/${id}`)
          .then((response) => response.json())
          .then((response) => {
            cache[id] = response;
            setTrivia(response);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      } else {
        setTrivia(cache[id]);
        setLoading(false);
      }
    }
  }, [id, cache]);

  return { trivia, id, loading, setId, setLoading };
};

export { useTrivia };
