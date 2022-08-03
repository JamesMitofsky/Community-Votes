import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UrlBuilder() {
  const [votableID, setVotableID] = useState("");
  const [voterID, setVoterID] = useState("");

  let constructedURL = "/voter/?votableID=" + votableID + "&voterID=" + voterID;

  return (
    <>
      <Typography variant="h1">Create Voter Ballot Link</Typography>
      <TextField
        label="Votable ID"
        value={votableID}
        onChange={(e) => setVotableID(e.target.value.replaceAll(" ", "-"))}
      />
      <TextField
        label="Voter ID"
        value={voterID}
        onChange={(e) => setVoterID(e.target.value.replaceAll(" ", "-"))}
      />
      {votableID && voterID && (
        <>
          <Typography variant="h2">Constructed Link</Typography>
          <Link target="_blank" to={constructedURL}>
            {process.env.REACT_APP_SERVER_ADDRESS + constructedURL}
          </Link>
        </>
      )}
    </>
  );
}
