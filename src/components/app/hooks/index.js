import React from "react";

/**
 * @author 109149
 * @time Sun 14 Mar 2021 22:50:59 +04
 *
 * Fetches image urls from server.
 *
 * @param {string} ID is the movie id.
 * @param {object} cache is the fetched trivia to cache.
 * @return {object} imageUrls, id, loading, setId, setLoading.
 */
const useImageUrls = ({ ID, cache }) => {
  const [imageUrls, setImageUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState(ID);

  React.useEffect(() => {
    // if (process.env.NODE_ENV === "development")
    //   console.log("useImageUrls Effect");
    if (id) {
      if (!cache[id]) {
        fetch(`/imageUrls/${id}`)
          .then((response) => response.json())
          .then((response) => {
            cache[id] = { ...cache[id], imageUrls: response.imageUrls };
            setImageUrls(response.imageUrls);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      } else {
        setImageUrls(cache[id].imageUrls);
        setLoading(false);
      }
    }
  }, [id, cache]);

  return { imageUrls, id, loading, setId, setLoading };
};

const _imageUrls = [
  "https://m.media-amazon.com/images/M/MV5BMDVlODU1YjYtOGVlNy00MzQ2LThjYTQtMmJmOGM0ZWIxMTA1XkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTA0MGI0OGQtODRjOC00ZmQyLTk3MzAtZGVkMmY4YjhhYzZkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BZGU4NDM4NmEtMDM5Ni00NGIyLTllNjItMGM5MjgwNTUzMjYzXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BYTRmYzkyYmItNDQxMi00MDY0LTg2ODAtOTk1YzViY2Y1MjcwXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
];
const _useImageUrls = ({ ID, cache }) => {
  const [imageUrls, setImageUrls] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState(ID);

  React.useEffect(() => {
    if (id) {
      if (!cache[id]) {
        Promise.resolve({
          imageUrls: _imageUrls,
        })
          .then((response) => {
            cache[id] = { ...cache[id], imageUrls: response.imageUrls };
            setImageUrls(response.imageUrls);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      } else {
        setImageUrls(cache[id].imageUrls);
        setLoading(false);
      }
    }
  }, [id, cache]);

  return { imageUrls, id, loading, setId, setLoading };
};

/**
 * @author 109149
 * @time Fri 12 Mar 2021 01:10:51 +04
 *
 * Fetches trivia from server.
 *
 * @param {string} ID is the movie id.
 * @param {object} cache is the fetched trivia to cache.
 * @returns {object} trivia, id, loading, setId, setLoading.
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

// just a mock of useTrivia hook, so we don't flood server with requests
const _useTrivia = ({ ID, cache }) => {
  const [trivia, setTrivia] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [id, setId] = React.useState(ID);

  React.useEffect(() => {
    if (id) {
      if (!cache[id]) {
        Promise.resolve({
          trivia: [
            "trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1trivia 1",
            "trivia 2",
            "trivia 3",
            "trivia 4",
          ],
          spoilers: ["spoiler 1", "spoiler 2", "spoiler 3", "spoiler 4"],
        })
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

export { useTrivia, _useTrivia, useImageUrls, _useImageUrls };
