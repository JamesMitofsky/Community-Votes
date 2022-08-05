import { Typography, Button } from "@mui/material";
import axios from "axios";

export default function ResultsView() {
  function getResults() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
      headers: {
        "x-access-token":
          "e40f68b57ced585d79955d151861d2dfe22ca3b96d0a9ccd084690a338138203",
      },
    });

    instance
      .get("/votables")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Typography variant="h1">Results</Typography>
      <Typography variant="subtitle1">
        Here are the results of the voting period.
      </Typography>
      <Button onClick={getResults}>Get Results</Button>
    </>
  );
}
