import React, { useCallback, useRef, useState } from "react";
import { Box, Button, Grid, Paper } from "@mui/material";
import { AnalyticEvent, Elevations, ValueStreams } from "./telemetry/events";
import {
  ElevationContext,
  useButtonTelemetryEvent,
} from "./telemetry/hooks/useButtonTelemetryEvent";
import { sendEvent } from "./telemetry/client";
import { DialogExample } from "./DialogExample";

interface ComposedProps {}

export const ButtonBox: React.FC<ComposedProps> = () => {
  var buttonRef = useRef(null);
  useButtonTelemetryEvent(buttonRef);

  var buttonExplicitRef = useRef(null);
  const callBackEvent = useCallback((e: AnalyticEvent): void => {
    //use this when you need to intercept the log request, for example
    // e.g In a widget, where you can call the WidgetSDK
    sendEvent(e);
  }, []);
  useButtonTelemetryEvent(buttonExplicitRef, callBackEvent);

  var divRef = useRef(null);
  useButtonTelemetryEvent(divRef);

  var disabledButtonRef = useRef(null);
  useButtonTelemetryEvent(disabledButtonRef);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Paper style={{ width: "100%", marginBottom: 32 }}>
      <Box
        p={4}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#eeeeee",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              ref={buttonRef}
              data-layer-type="function"
              data-layer-value-stream={ValueStreams.Unknown}
              data-layer-label={"Button Event"}
              data-layer-value={undefined}
              data-layer-elevation={Elevations.Page}
            >
              Button Event
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              ref={buttonExplicitRef}
              data-layer-type="function"
              data-layer-value-stream={ValueStreams.Unknown}
              data-layer-label={"Button Event with Callback handler"}
              data-layer-value={undefined}
              data-layer-elevation={Elevations.Page}
            >
              Button Event with Callback handler
            </Button>
          </Grid>
          <Grid item>
            <div
              ref={divRef}
              data-layer-type="function"
              data-layer-label={"Div Click Event"}
              data-layer-enabled={false}
            >
              Div Click Event
            </div>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              ref={disabledButtonRef}
              data-layer-label={"Disabled button"}
              disabled
            >
              Disabled button
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setIsDialogOpen(true)}>Open dialog</Button>
            <ElevationContext.Provider value={Elevations.Dialog}>
              <DialogExample
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              />
            </ElevationContext.Provider>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
