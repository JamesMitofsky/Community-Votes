import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Error({ state, response }) {
  const email = {
    recipient: "jamesmitofsky@gmail.com",
    subject: "HOA Votes: something's not working right",
    body: `Can you tell us what you were trying to do when you received this error? Please type directly beneath this text, and we'll get back to you ASAP!`,
    newlineSpace: "%0D%0A%0D%0A%0D%0A%0D%0A------------------",
    serverResponse: JSON.stringify(response),
  };

  const constructedHref = `mailto:${email.recipient}?subject=${
    email.subject
  }&body=${email.body}${
    email.serverResponse.length > 2 ? email.newlineSpace : ""
  }${email.serverResponse.length > 2 ? email.serverResponse : ""}`;
  return (
    <Snackbar open={state} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>Sorry about that, we had a problem. 👷</AlertTitle>
        Help us get back on track by clicking{" "}
        <a rel="noreferrer" target="_blank" href={constructedHref}>
          here
        </a>
        !
      </Alert>
    </Snackbar>
  );
}
