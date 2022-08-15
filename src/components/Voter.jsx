import { FormControl, TextField, Button } from "@mui/material";

export default function Voter({ currentVoter, updateVoter, submitVoter }) {
  let formComplete =
    currentVoter.voterName &&
    currentVoter.voterEmail &&
    currentVoter.voterVotes;

  let incompleteForm = !formComplete;

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          autoComplete="off"
          onChange={updateVoter}
          value={currentVoter.voterName}
          label="Voter name"
          name="voterName"
          required
          fullWidth
        />
      </FormControl>
      <FormControl>
        <TextField
          autoComplete="off"
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
          autoComplete="off"
          onChange={updateVoter}
          value={currentVoter.voterEmail}
          name="voterEmail"
          type="email"
          required
          label="Voter email address"
        />
      </FormControl>
      <Button disabled={incompleteForm} onClick={submitVoter} fullWidth variant="contained" sx={{ mt: 2}}>
        Add Voter
      </Button>
    </>
  );
}
