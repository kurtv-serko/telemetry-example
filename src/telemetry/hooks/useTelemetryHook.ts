import { useCallback, useState } from "react";
import { AnalyticEvent } from "../events";
import {
  useButtonTelemetryEvent,
  useTextFieldTelemetryEvent,
} from "./useTelemetryEvent";

const useRefChange = () => {
  const [domNode, setDomNode] = useState(null);
  const onRefChange = useCallback((node: any) => {
    setDomNode(node); // trigger re-render on changes
  }, []);

  return [domNode, onRefChange];
};

export const useTextFieldTelemetryHook = () => {
  const [domElement, ref] = useRefChange();
  useTextFieldTelemetryEvent(domElement);

  return [ref];
};

export const useButtonTelemetryHook = (
  callback?: (e: AnalyticEvent) => void,
) => {
  const [domElement, ref] = useRefChange();
  useButtonTelemetryEvent(domElement, callback);

  return [ref];
};
