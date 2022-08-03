import { TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UrlBuilder() {
  const [votableID, setVotableID] = useState("");
  const [voterID, setVoterID] = useState("");

  let constructedURL = "/?votableID=" + votableID + "&voterID=" + voterID;

  return (
    <>
      <h1>Create Voter Ballot Link</h1>
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
          <h2>Constructed Link</h2>
          <Link target="_blank" to={constructedURL}>
            {process.env.REACT_APP_SERVER_ADDRESS + constructedURL}
          </Link>
        </>
      )}
    </>
  );
}
