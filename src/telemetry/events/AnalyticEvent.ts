import { EventNames } from "./enumerations/EventNames";
import { Elevations, Interactions, ValueStreams } from "./enumerations";

export interface IAnalyticEvent {
  event?: EventNames;
  type?: string;
  valueStream?: ValueStreams;
  interaction?: Interactions;
  label?: string;
  elevation?: Elevations;
  inPageLocation?: string;
  // The version number of the event.
  readonly v?: number;
}

export abstract class AnalyticEvent implements IAnalyticEvent {
  event?: EventNames;
  type?: string;
  valueStream?: ValueStreams;
  interaction?: Interactions;
  label?: string;
  elevation?: Elevations;
  inPageLocation?: string;
  v?: number;
}

export interface IButtonEvent extends IAnalyticEvent {
  value?: string;
  enabled?: boolean;
}

export class ButtonEvent extends AnalyticEvent implements IButtonEvent {
  constructor(data?: Partial<IButtonEvent>) {
    super();
    this.event = EventNames.Button;
    this.v = 4;
    Object.assign(this, data);
  }
}

export interface ITextFieldEvent extends IAnalyticEvent {
  newState?: "focused" | "unfocused";
}

export class TextFieldEvent extends AnalyticEvent implements ITextFieldEvent {
  constructor(data?: Partial<ITextFieldEvent>) {
    super();
    this.event = EventNames.TextField;
    this.type = "text input";
    this.v = 1;
    Object.assign(this, data);
  }
}
