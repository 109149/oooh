import React from "react";

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

export default useLocalStorage;
