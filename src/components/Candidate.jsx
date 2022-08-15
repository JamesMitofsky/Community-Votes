import { FormControl, TextField, Button } from "@mui/material";

export default function Candidate({
  currentCandidate,
  setCurrentCandidate,
  addCandidate,
}) {
  let formComplete = !currentCandidate;

  return (
    <>
      <FormControl fullWidth>
        <TextField
          autoComplete="off"
          required
          fullWidth
          label="Candidate name"
          value={currentCandidate}
          onChange={(e) => setCurrentCandidate(e.target.value)}
        ></TextField>
      </FormControl>
      <Button disabled={formComplete} onClick={addCandidate} fullWidth variant="contained" sx= {{ mt: 2}}>
        Add Candidate
      </Button>
    </>
  );
}
