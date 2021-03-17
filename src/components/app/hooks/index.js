import React from "react";

/**
 * @author 109149
 * @time Wed 17 Mar 2021 23:37:30 +04
 *
 * Hook for toggling dark mode. Prioritizes localStorage's value.
 *
 * @return {tuple} enabled - whether user wants dark mode or not, and
 * setIsDarkModeEnabled - setter for localStorage dark mode.
 */
const useDarkMode = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useLocalStorage(
    "oooh-dark-mode"
  );
  const prefersDarkMode = usePrefersDarkMode();
  const enabled = isDarkModeEnabled ?? prefersDarkMode;

  React.useEffect(() => {
    const body = document.body;
    if (enabled) body.setAttribute("data-theme", "dark");
    else body.setAttribute("data-theme", "light");
  }, [enabled]);

  return [enabled, setIsDarkModeEnabled];
};

/**
 * @author 109149
 * @time Wed 17 Mar 2021 23:21:49 +04
 *
 * Gets prefers-color-scheme media query.
 *
 * @return {boolean} prefersDarkMode is true if prefers-color-scheme media
 * query is set to dark.
 */
const usePrefersDarkMode = () => {
  let mql = window.matchMedia("(prefers-color-scheme: dark)");
  const [prefersDarkMode, setPrefersDarkMode] = React.useState(false);

  const handler = (e) => {
    setPrefersDarkMode(e.matches);
  };

  useEventListener("change", handler, mql);

  return prefersDarkMode;
};

/**
 * @author 109149
 * @time Wed 17 Mar 2021 21:59:28 +04
 *
 * Hook for adding/removing event listener on element.
 *
 * @inspiredBy usehooks.com/useEventListener
 *
 * @param {string} eventName is the event to listen to.
 * @param {function} eventHandler is the function to dispatch when event occurs.
 * @param {Element} element is the target to attach the event listener to.
 */
const useEventListener = (eventName, eventHandler, element = window) => {
  const handler = React.useRef();

  React.useEffect(() => {
    handler.current = eventHandler;
  }, [eventHandler]);

  React.useEffect(() => {
    const valid = element && element.addEventListener;
    if (!valid) return;

    const _eventHandler = (event) => handler.current(event);

    element.addEventListener(eventName, _eventHandler);

    return () => element.removeEventListener(eventName, _eventHandler);
  }, [eventName, element]);
};

/**
 * @author 109149
 * @time Wed 17 Mar 2021 20:54:39 +04
 *
 * Toggles between true and false.
 *
 * @param {string} initialValue is initial value to set.
 * @return {tuple} state and its dispatcher.
 */
const useToggle = (initialValue = false) => {
  return React.useReducer((state) => !state, initialValue);
};

/**
 * @author 109149
 * @time Wed 17 Mar 2021 20:48:40 +04
 *
 * "Mimics" React.useState; Sets/gets localstorage value.
 *
 * @inspiredBy usehooks.com/useLocalStorage
 *
 * @param {string} key is localStorage item key.
 * @param {string} initialValue is localStorage item's initial value.
 * @return {tuple} item value and its setter.
 */
const useLocalStorage = (key, initialValue) => {
  const [state, setState] = React.useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value && value !== "undefined" ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [state, setValue];
};

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

export {
  useTrivia,
  _useTrivia,
  useImageUrls,
  _useImageUrls,
  useLocalStorage,
  useToggle,
  useEventListener,
  usePrefersDarkMode,
  useDarkMode,
};
