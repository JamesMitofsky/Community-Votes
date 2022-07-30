import { Grid, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Votable from "./Votable.jsx";
import Voter from "./Voter.jsx";
import Candidate from "./Candidate.jsx";
import VotersList from "./VotersList.jsx";

export default function BuildVotable() {
  // STATES SECTION

  // STATE 1: currentVoter accepts object, eventually sending to the voters array (State 2)
  const [currentVoter, setCurrentVoter] = useState({
    voterName: "",
    voterEmail: "",
    voterVotes: 0,
  });
  function updateVoter(event) {
    const name = event.target.name;
    // does incoming property exist on object
    if (currentVoter[name] === undefined)
      throw `HOA Error: ${name} does not exist as a property of the currentVoter object.`;

    const value = event.target.value;
    setCurrentVoter({
      ...currentVoter,
      [name]: value,
    });
  }

  // STATE 1.a: voters accepts array of objects from State 1
  const [voters, setVoters] = useState([]);
  function addVoterToArray() {
    setVoters((prevVoters) => [...prevVoters, currentVoter]);
    setCurrentVoter({ voterName: "", voterEmail: "", voterVotes: 0 });
  }

  // STATE 2: update current candidate field
  // const [candidates, setCandidates] = useState("");
  // function updateCandidates(event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setCandidates(value);
  // }

  // STATE 2.a:

  // STATE 3: votable accepts a string
  // const [votable, setVotable] = useState("");

  return (
    <Grid component="form" container rowSpacing={5} style={{ display: "flex" }}>
      <Grid item xs={12}>
        <Typography variant="h2">Create a votable!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Votable />
      </Grid>
      <Grid item xs={12}>
        <Candidate />
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
