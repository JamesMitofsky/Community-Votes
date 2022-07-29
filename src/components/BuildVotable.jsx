import { Grid, Button, Typography } from "@mui/material";
import FormControlledInputs from "./FormControlledInputs.jsx";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BuildVotable() {
  // keep track of each input field's state
  const [votable, setVotable] = useState("test");
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const states = {
    votable,
    voters,
    candidates,
  };
  const setStates = {
    setVotable,
    setVoters,
    setCandidates,
  };

  // categories for for each part of the input form
  const categories = ["votable", "candidates", "voters"];

  function handleSubmit() {
    alert("we've logged your vote!");
  }

  let addVoterForm = categories.map((category) => {
    return (
      <FormControlledInputs
        key={uuidv4()}
        state={states[category]}
        setState={setStates[category]}
        category={category}
      />
    );
  });

  return (
    <Grid component="form" container rowSpacing={5} style={{ display: "flex" }}>
      <Grid item xs={12}>
        <Typography variant="h2">Create a votable!</Typography>
      </Grid>
      {addVoterForm}
      <Grid item xs={12}>
        <Button
          disabled
          onClick={handleSubmit}
          fullWidth
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Submit this votable
        </Button>
      </Grid>
    </Grid>
  );
}
