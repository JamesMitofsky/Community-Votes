import { FormControl, TextField, Grid, Button } from "@mui/material";

export default function FormControlledInputs({ state, setState, category }) {
  console.log(state);
  const helperText =
    category !== "Votable" ? `Separate ${category} with commas` : null;

  const isVoter = category === "Voters";
  const isVoterElm = (
    <>
      <FormControl fullWidth>
        <TextField label="Voter's name" required fullWidth></TextField>
      </FormControl>
      <FormControl>
        <TextField
          type="number"
          required
          fullWidth
          label="# of votes"
        ></TextField>
      </FormControl>
      <FormControl>
        <TextField
          type="email"
          required
          label="Voter's email address"
        ></TextField>
      </FormControl>
      <Button fullWidth>Add Voter</Button>
    </>
  );
  const notVoterElm = (
    <FormControl fullWidth>
      <TextField
        required
        fullWidth
        helperText={helperText}
        label={category}
      ></TextField>
    </FormControl>
  );
  return (
    <Grid item xs={12}>
      {isVoter ? isVoterElm : notVoterElm}
    </Grid>
  );
}
