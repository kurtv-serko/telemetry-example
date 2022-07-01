import "./App.css";
import { Container } from "@mui/material";
import {
  ElevationContext,
  InPageLocationContext,
} from "./telemetry/hooks/useButtonTelemetryEvent";
import { Elevations, InPageLocation } from "./telemetry/events";
import { ButtonBox } from "./ButtonBox";
import { InputBox } from "./InputBox";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <ElevationContext.Provider value={Elevations.Page}>
          <Container>
            <InPageLocationContext.Provider value={InPageLocation.ButtonBox}>
              <ButtonBox />
            </InPageLocationContext.Provider>
            <InPageLocationContext.Provider value={InPageLocation.InputBox}>
              <InputBox />
            </InPageLocationContext.Provider>
          </Container>
        </ElevationContext.Provider>
      </div>
    </div>
  );
}

export default App;
