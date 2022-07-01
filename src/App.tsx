import "./App.css";
import { Container } from "@mui/material";
import { Elevations, InPageLocation } from "./telemetry/events";
import { ButtonBox } from "./ButtonBox";
import { InputBox } from "./InputBox";
import { ElevationContext, InPageLocationContext } from "./telemetry/context";

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
