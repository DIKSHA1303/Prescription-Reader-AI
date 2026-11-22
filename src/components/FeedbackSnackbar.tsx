import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface FeedbackSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

export default function FeedbackSnackbar({
  open,
  message,
  severity,
  onClose,
}: FeedbackSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
