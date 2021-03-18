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

// eslint-disable-next-line
const _imageUrls = [
  "https://m.media-amazon.com/images/M/MV5BMDVlODU1YjYtOGVlNy00MzQ2LThjYTQtMmJmOGM0ZWIxMTA1XkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BMTA0MGI0OGQtODRjOC00ZmQyLTk3MzAtZGVkMmY4YjhhYzZkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BZGU4NDM4NmEtMDM5Ni00NGIyLTllNjItMGM5MjgwNTUzMjYzXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
  "https://m.media-amazon.com/images/M/MV5BYTRmYzkyYmItNDQxMi00MDY0LTg2ODAtOTk1YzViY2Y1MjcwXkEyXkFqcGdeQXVyNjg2NjQwMDQ@.jpg",
];

export default useImageUrls;
