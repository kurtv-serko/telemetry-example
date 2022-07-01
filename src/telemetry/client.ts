// Anything exported from this file is importable by other in-browser modules.
import { getDataLayer } from "./datalayer/datalayer-provider";
import { AnalyticEvent } from "./events";

/**
 * Sends analytics event via data layer (https://serko.atlassian.net/wiki/spaces/AN/pages/2499018915/Analytics+Registry#Datalayer-structures-and-options)
 *
 * @param {AnalyticEvent} event - An analytics event that you want to send
 * @return {void}
 */
export const sendEvent = (event: AnalyticEvent): void => {
  const dataLayer = getDataLayer();
  dataLayer.push(event);
};
