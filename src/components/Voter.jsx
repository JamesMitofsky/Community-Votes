import { FormControl, TextField, Button } from "@mui/material";

export default function Voter({ currentVoter, updateVoter, submitVoter }) {
  let formComplete =
    currentVoter.voterName &&
    currentVoter.voterEmail &&
    currentVoter.voterVotes;

  let incompleteForm = !formComplete;

  return (
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
      <Button disabled={incompleteForm} onClick={submitVoter} fullWidth>
        Add Voter
      </Button>
    </>
  );
}
