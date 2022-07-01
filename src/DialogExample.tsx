import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useButtonTelemetryEvent } from "./telemetry/hooks/useButtonTelemetryEvent";
import { useRefChange } from "./telemetry/hooks/useRefCallback";

interface Props {
  open: boolean;
  onClose?: () => void;
}

export const DialogExample: React.FC<Props> = ({ open, onClose }) => {
  const [closeNode, closeRef] = useRefChange();
  useButtonTelemetryEvent(closeNode);

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
