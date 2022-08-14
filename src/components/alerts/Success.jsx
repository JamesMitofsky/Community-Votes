import JSConfetti from "js-confetti";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useEffect } from "react";

export default function Success({ succeeded, endSuccess }) {
  useEffect(() => {
    // return if not succeeded
    if (!succeeded) return;

    // Innitialize confetti object
    const jsConfetti = new JSConfetti();

    // Trigger confetti animation
    jsConfetti.addConfetti();
  }, [succeeded]);

  return (
    <Snackbar open={succeeded} onClose={endSuccess} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success</AlertTitle>
        Your votes have been submitted!
      </Alert>
    </Snackbar>
  );
}
