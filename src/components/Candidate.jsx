import { FormControl, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Candidate({ addCandidate }) {
  const [candidateName, setCandidateName] = useState("");
  let isFormComplete = Boolean(candidateName);

  function onSubmit() {
    addCandidate(candidateName);
    setCandidateName("");
  }

  return (
    <>
      <FormControl fullWidth>
        <TextField
          autoComplete="off"
          required
          fullWidth
          label="Candidate name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        ></TextField>
      </FormControl>
      <Button disabled={!isFormComplete} onClick={onSubmit} fullWidth variant="contained" sx= {{ mt: 2}}>
        Add Candidate
      </Button>
    </>
  );
}
