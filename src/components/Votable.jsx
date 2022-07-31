import { FormControl, TextField } from "@mui/material";

export default function Votable({ currentVotable, setCurrentVotable }) {
  const helperText = "Please enter candidate's name";

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
