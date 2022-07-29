import { FormControl, TextField, Button } from "@mui/material";

export default function Voter({ currentVoter, updateVoter }) {
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
      <Button fullWidth>Add Voter</Button>
    </>
  );
}
