import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Error({ state, response, message }) {
  const email = {
    recipient: "jamesmitofsky@gmail.com",
    subject: "HOA Votes: something's not working right",
    body: `Can you tell us what you were trying to do when you received this error? Please type directly beneath this text, and we'll get back to you ASAP!`,
    newlineSpace: "%0D%0A%0D%0A%0D%0A%0D%0A------------------%0D%0A",
  };

  const constructedHref = `mailto:${email.recipient}?subject=${email.subject}&body=${email.body}`;
  return (
    <Snackbar open={state} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>Sorry about that, we had a problem. 👷</AlertTitle>
        {message} Help us get back on track:{" "}
        <a rel="noreferrer" target="_blank" href={constructedHref}>
          send an email
        </a>
        !
      </Alert>
    </Snackbar>
  );
}
