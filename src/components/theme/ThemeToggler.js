import React from "react";
import { useDarkMode } from "../app/hooks";

const ThemeToggler = () => {
  const [, setDarkMode] = useDarkMode();

  return <button onClick={() => setDarkMode((prev) => !prev)}>Toggle</button>;
};

export default ThemeToggler;
