import { FormControl, TextField, Grid, Button } from "@mui/material";

export default function FormControlledInputs({
  category,
  currentVoter,
  updateVoter,
}) {
  const helperText =
    category !== "votable" ? `Separate ${category} with commas` : null;

  const isVoter = category === "voters";
  const isVoterElm = (
    <>
      <FormControl fullWidth>
        <TextField
          onChange={updateVoter}
          value={currentVoter.voterName}
          label="Voter's name"
          name="voterName"
          required
          fullWidth
        />
      </FormControl>
      <FormControl>
        <TextField
          onChange={updateVoter}
          type="number"
          value={currentVoter.voterVotes}
          name="voterVotes"
          required
          fullWidth
          label="# of votes"
        />
      </FormControl>
      <FormControl>
        <TextField
          onChange={updateVoter}
          value={currentVoter.voterEmail}
          name="voterEmail"
          type="email"
          required
          label="Voter's email address"
        />
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
