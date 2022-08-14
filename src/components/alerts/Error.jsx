import { Alert, AlertTitle, Snackbar } from "@mui/material";

export default function Error({ state, response }) {
  const email = {
    recipient: "jamesmitofsky@gmail.com",
    subject: "HOA Votes: something's not working right",
    body: `This is an automatically generated report that shares some basic details about your problem with the HOA Votes development team. They'll check this out and get back in touch with you ASAP! %0D%0A%0D%0A`,
    serverResponse: JSON.stringify(response),
  };

  const constructedHref = `mailto:${email.recipient}?subject=${email.subject}&body=${email.body}${email.serverResponse}`;
  return (
    <Snackbar open={state} autoHideDuration={6000}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <AlertTitle>{response.message}</AlertTitle>
        It looks like we couldn't submit your vote.{" "}
        <a rel="noreferrer" target="_blank" href={constructedHref}>
          Click here, and we'll help you out!
        </a>
      </Alert>
    </Snackbar>
  );
}
