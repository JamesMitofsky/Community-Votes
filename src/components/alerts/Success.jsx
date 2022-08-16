import JSConfetti from "js-confetti";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

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
    <Snackbar open={alertState} onClose={endAlert} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success</AlertTitle>
        Your votes have been submitted!
      </Alert>
    </Snackbar>
  );
}
