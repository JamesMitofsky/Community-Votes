import { FormControl, TextField, Button } from "@mui/material";

export default function Votable({
  addVotable,
  currentVotable,
  setCurrentVotable,
}) {
  const helperText = "Please enter candidate's name";
  let formComplete = !currentVotable;

  return (
    <>
      <FormControl fullWidth>
        <TextField
          autoComplete="off"
          required
          fullWidth
          helperText={helperText}
          label="Votable"
          value={currentVotable}
          onChange={(e) => setCurrentVotable(e.target.value)}
        ></TextField>
      </FormControl>
      <Button disabled={formComplete} onClick={addVotable} fullWidth>
        Add Candidate
      </Button>
    </>
  );
}
