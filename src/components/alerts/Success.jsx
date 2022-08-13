import JSConfetti from "js-confetti";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Success({ succeeded }) {
  // Innitialize confetti object
  const jsConfetti = new JSConfetti();

  if (succeeded) {
    jsConfetti.addConfetti();
  }

  return (
    <Snackbar open={succeeded} autoHideDuration={6000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        <AlertTitle>Success</AlertTitle>
        Your votes have been submitted!
      </Alert>
    </Snackbar>
  );
}
