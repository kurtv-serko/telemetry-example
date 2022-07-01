import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useButtonTelemetryHook } from "./telemetry/hooks/useTelemetryHook";

interface Props {
  open: boolean;
  onClose?: () => void;
}

export const DialogExample: React.FC<Props> = ({ open, onClose }) => {
  const [closeRef] = useButtonTelemetryHook();

  return (
    <>
      <Dialog open={open}>
        <DialogContent>This is a dialog</DialogContent>
        <DialogActions>
          <Button ref={closeRef} onClick={onClose} data-layer-value="close">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
