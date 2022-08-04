import { FormControl, TextField } from "@mui/material";

export default function Votable({ currentVotable, setCurrentVotable }) {
  const helperText = "Enter what's being voted on";

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
    </>
  );
}
