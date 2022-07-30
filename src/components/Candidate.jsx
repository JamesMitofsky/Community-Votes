import { FormControl, TextField, Button } from "@mui/material";

export default function Candidate({
  currentCandidate,
  setCurrentCandidate,
  addCandidate,
}) {
  const helperText = "Please enter your name";

  let formComplete = !currentCandidate;

  return (
    <>
      <FormControl fullWidth>
        <TextField
          autoComplete="off"
          required
          fullWidth
          helperText={helperText}
          label="Candidate"
          value={currentCandidate}
          onChange={(e) => setCurrentCandidate(e.target.value)}
        ></TextField>
      </FormControl>
      <Button disabled={formComplete} onClick={addCandidate} fullWidth>
        Add Candidate
      </Button>
    </>
  );
}
