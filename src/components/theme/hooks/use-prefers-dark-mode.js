import React from "react";
import useEventListener from "./use-event-listener";

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

export default usePrefersDarkMode;
