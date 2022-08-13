import JSConfetti from "js-confetti";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useEffect } from "react";

export default function Success({ succeeded }) {
  useEffect(() => {
    // Innitialize confetti object
    const jsConfetti = new JSConfetti();

    if (succeeded) {
      jsConfetti.addConfetti();
    }
  }, [succeeded]);

  return (
    <Snackbar open={succeeded} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success</AlertTitle>
        Your votes have been submitted!
      </Alert>
    </Snackbar>
  );
}
