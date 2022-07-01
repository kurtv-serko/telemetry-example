import React, { useContext } from "react";
import { useEffect, useMemo } from "react";
import { sendEvent as sendTelemetryEvent } from "../client";
import {
  AnalyticEvent,
  ButtonEvent,
  Elevations,
  InPageLocation,
  TextFieldEvent,
} from "../events";
import { Interactions } from "../events/enumerations/Interactions";

export const InPageLocationContext = React.createContext<
  InPageLocation | undefined
>(undefined);
export const ElevationContext = React.createContext<Elevations | undefined>(
  undefined,
);

export const useButtonTelemetryEvent = (
  /**
   * ref of the React component
   */
  ref: any,
  /**
   * Allow for override (e.g. Widget SDK)
   */
  sendEventHandler?: (event: AnalyticEvent) => void,
) => {
  const { sendEvent } = useEventHandler(sendEventHandler);

  const inPageLocation = useContext(InPageLocationContext);
  const elevation = useContext(ElevationContext);

  // console.log({ ref });

  useEffect(() => {
    const element = ref.current;

    const handleClick = (_event: any) => {
      const buttonEvent = new ButtonEvent({
        type: element.getAttribute("data-layer-type") ?? "function",
        valueStream: element.getAttribute("data-layer-value-stream"),
        interaction: Interactions.Click,
        label: element.getAttribute("data-layer-label"),
        value: element.getAttribute("data-layer-value"),
        elevation,
        inPageLocation,
        enabled:
          element.getAttribute("data-layer-enabled") ?? !element.disabled,
      });
      removeEmptyEntries(buttonEvent);
      sendEvent(buttonEvent);
    };

    console.log({ element });

    if (element) element.addEventListener("click", handleClick);

    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
    //cant use ref here, need to fix
  }, [elevation, inPageLocation, ref, sendEvent]);
};

export const useTextFieldTelemetryEvent = (
  /**
   * ref of the React component
   */
  ref: any,
  /**
   * Allow for override (e.g. Widget SDK)
   */
  sendEventHandler?: (event: AnalyticEvent) => void,
) => {
  const { sendEvent } = useEventHandler(sendEventHandler);
  const inPageLocation = useContext(InPageLocationContext);
  const elevation = useContext(ElevationContext);

  useEffect(() => {
    function createEvent(element: any, newState: "focused" | "unfocused") {
      const textFieldEvent = new TextFieldEvent({
        valueStream: element.getAttribute("data-layer-value-stream"),
        interaction: Interactions.Click,
        newState,
        label: element.getAttribute("data-layer-label"),
        elevation,
        inPageLocation,
      });
      removeEmptyEntries(textFieldEvent);
      return textFieldEvent;
    }
    const element = ref.current;

    const handleFocus = (event: any) => {
      event.stopImmediatePropagation();
      const element = ref.current;
      const buttonEvent = createEvent(element, "focused");
      sendEvent(buttonEvent);
    };

    const handleBlur = (event: any) => {
      const element = ref.current;
      const buttonEvent = createEvent(element, "unfocused");
      sendEvent(buttonEvent);
    };

    if (element) {
      element.addEventListener("focus", handleFocus);
      element.addEventListener("blur", handleBlur);
    }

    return () => {
      if (element) {
        element.removeEventListener("focus", handleBlur);
        element.removeEventListener("blur", handleBlur);
      }
    };
  }, [elevation, inPageLocation, ref, sendEvent]);
};

/**
 *
 * helper functions
 */

/**
 *
 * @returns Your custom event handler, or the default one.
 */
function useEventHandler(sendEventHandler?: (event: AnalyticEvent) => void) {
  const sendEvent = useMemo(() => {
    return sendEventHandler ?? sendTelemetryEvent;
  }, [sendEventHandler]);
  return { sendEvent };
}

/**
 *
 * Removes the undefined properties of an object.
 */
function removeEmptyEntries(object: any) {
  Object.keys(object).forEach(
    (key) =>
      (object[key] === undefined || object[key] === null) && delete object[key],
  );
}
