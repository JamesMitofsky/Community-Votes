import { Grid, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Votable from "./Votable.jsx";
import Voter from "./Voter.jsx";
import Candidate from "./Candidate.jsx";
import VotersList from "./VotersList.jsx";

export default function BuildVotable() {
  const [currentVoter, setCurrentVoter] = useState({
    voterName: "",
    voterEmail: "",
    voterVotes: 0,
  });

  const [voters, setVoters] = useState([]);

  function addVoterToArray() {
    console.log("submitCurrentVoter");
    setVoters((prevVoters) => [...prevVoters, currentVoter]);
    setCurrentVoter({ voterName: "", voterEmail: "", voterVotes: 0 });
  }

  function updateVoter(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentVoter({
      ...currentVoter,
      [name]: value,
    });
    console.log(currentVoter);
  }

  return (
    <Grid component="form" container rowSpacing={5} style={{ display: "flex" }}>
      <Grid item xs={12}>
        <Typography variant="h2">Create a votable!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Votable currentVoter={currentVoter} updateVoter={updateVoter} />
      </Grid>
      <Grid item xs={12}>
        <Candidate currentVoter={currentVoter} updateVoter={updateVoter} />
      </Grid>
      <Grid item xs={12}>
        <Voter
          currentVoter={currentVoter}
          updateVoter={updateVoter}
          submitVoter={addVoterToArray}
        />
        <Typography variant="h3">
          {voters.length > 0 ? "Registered Voters" : ""}
        </Typography>
        <VotersList voters={voters} />
      </Grid>
      <Grid item xs={12}>
        <Button disabled fullWidth startIcon={<SaveIcon />} variant="contained">
          Save this votable
        </Button>
      </Grid>
    </Grid>
  );
}
