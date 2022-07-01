import React from "react";
import { Box, Paper, TextField } from "@mui/material";
import { useTextFieldTelemetryEvent } from "./telemetry/hooks/useButtonTelemetryEvent";
import { useRefChange } from "./telemetry/hooks/useRefCallback";

interface ComposedProps {}

export const InputBox: React.FC<ComposedProps> = () => {
  var [textFieldNode, textFieldRef] = useRefChange();
  useTextFieldTelemetryEvent(textFieldNode);

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
