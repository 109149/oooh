import React from "react";

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

export default useEventListener;
