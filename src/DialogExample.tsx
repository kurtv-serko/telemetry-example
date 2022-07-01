import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useButtonTelemetryEvent } from "./telemetry/hooks/useButtonTelemetryEvent";
import { useRefCallback } from "./telemetry/hooks/useRefCallback";

interface Props {
  open: boolean;
  onClose?: () => void;
}

export const DialogExample: React.FC<Props> = ({ open, onClose }) => {
  const [closeRef] = useRefCallback();
  useButtonTelemetryEvent(closeRef);

  return (
    <>
      <Dialog open={open}>
        <DialogContent>This is a dialog</DialogContent>
        <DialogActions>
          <Button ref={closeRef} onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
