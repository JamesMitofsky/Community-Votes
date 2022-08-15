import { FormControl, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Voter({ submitVoter }) {
  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [voterVotes, setVoterVotes] = useState(0);

  let isFormComplete = voterName && voterEmail && voterVotes;

  function onSubmit() {
    submitVoter(voterName, voterEmail, voterVotes);
    setVoterName("");
    setVoterEmail("");
    setVoterVotes(0);
  }

  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          autoComplete="off"
          onChange={(e) => setVoterName(e.target.value)}
          value={voterName}
          label="Voter name"
          name="voterName"
          required
          fullWidth
        />
      </FormControl>
      <FormControl>
        <TextField
          autoComplete="off"
          type="number"
          onChange={(e) => setVoterVotes(e.target.value)}
          value={voterVotes}
          name="voterVotes"
          required
          fullWidth
          label="# of votes"
        />
      </FormControl>
      <FormControl>
        <TextField
          autoComplete="off"
          onChange={(e) => setVoterEmail(e.target.value)}
          value={voterEmail}
          name="voterEmail"
          type="email"
          required
          label="Voter email address"
        />
      </FormControl>
      <Button disabled={!isFormComplete} onClick={onSubmit} fullWidth variant="contained" sx={{ mt: 2}}>
        Add Voter
      </Button>
    </>
  );
}
