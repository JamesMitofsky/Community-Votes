import { Grid, Button, Typography } from "@mui/material";
import FormControlledInputs from "./FormControlledInputs.jsx";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function BuildVotable() {
  const [currentVoter, setCurrentVoter] = useState({
    voterName: "James",
    voterEmail: "",
    voterVotes: 0,
  });

  function handleSubmit() {
    alert("we've logged your vote!");
  }

  function updateVoter(event) {
    const name = event.target.name;
    const value = event.target.value;
    setCurrentVoter({
      ...currentVoter,
      [name]: value,
    });
  }

  console.log(currentVoter);
  const categories = ["votable", "candidates", "voters"];
  let addVoterForm = categories.map((category) => {
    return (
      <FormControlledInputs
        currentVoter={currentVoter}
        updateVoter={updateVoter}
        key={uuidv4()}
        category={category}
      />
    );
  });

  // return <Test currentVoter={currentVoter} updateVoter={updateVoter} />;

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
