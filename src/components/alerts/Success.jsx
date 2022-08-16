import JSConfetti from "js-confetti";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function Success({ succeeded }) {
  const [alertState, setAlertState] = useState(false);
  function endAlert() {
    setAlertState(false);
  }

  useEffect(() => {
    // return if not succeeded
    if (!succeeded) return;

    // start timer for hiding success alert
    setAlertState(true);

    // Innitialize confetti object
    const jsConfetti = new JSConfetti();

    // Trigger confetti animation
    jsConfetti.addConfetti();
  }, [succeeded]);

  return (
    <Snackbar open={alertState} onClose={endAlert} autoHideDuration={10000}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              endAlert();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity="success"
        sx={{ width: "100%" }}
      >
        <AlertTitle>Success</AlertTitle>
        Your votes have been submitted!
      </Alert>
    </Snackbar>
  );
}
