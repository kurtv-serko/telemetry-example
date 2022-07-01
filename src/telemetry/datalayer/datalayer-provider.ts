import { AnalyticEvent } from "../events";

declare global {
  interface Window {
    dataLayer?: AnalyticEvent[];
  }
}

export const getDataLayer = (): AnalyticEvent[] => {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};
