import React from "react";

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

export default useToggle;
