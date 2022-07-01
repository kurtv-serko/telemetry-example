import React, { useRef } from "react";
import { Box, Paper, TextField } from "@mui/material";
import { useTextFieldTelemetryEvent } from "./telemetry/hooks/useButtonTelemetryEvent";

interface ComposedProps {}

export const InputBox: React.FC<ComposedProps> = () => {
  var textFieldRef = useRef(null);
  useTextFieldTelemetryEvent(textFieldRef);

  return (
    <Paper style={{ width: "100%", marginBottom: 32 }}>
      <Box
        p={4}
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <TextField
          inputRef={textFieldRef}
          placeholder="enter text"
          data-layer-label={"Text field focus"}
        ></TextField>
      </Box>
    </Paper>
  );
};
