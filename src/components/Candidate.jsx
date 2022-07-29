import { FormControl, TextField } from "@mui/material";

export default function Candidate({ currentVoter, updateVoter }) {
  const helperText = "Please enter your name";
  return (
    <FormControl fullWidth>
      <TextField
        required
        fullWidth
        helperText={helperText}
        label="Candidate"
      ></TextField>
    </FormControl>
  );
}
