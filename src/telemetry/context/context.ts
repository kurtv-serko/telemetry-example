import React from "react";
import { Elevations, InPageLocation } from "../events";

export const InPageLocationContext = React.createContext<
  InPageLocation | undefined
>(undefined);

export const ElevationContext = React.createContext<Elevations | undefined>(
  undefined,
);
