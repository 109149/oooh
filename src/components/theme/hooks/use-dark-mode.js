import React from "react";
import useLocalStorage from "./use-local-storage";
import usePrefersDarkMode from "./use-prefers-dark-mode";

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

export default useDarkMode;
