import { FormControl, TextField } from "@mui/material";

export default function TextInput({
  currentText,
  setCurrentText,
  helperText,
  label,
}) {
  return (
    <>
      <FormControl fullWidth>
        <TextField
          autoComplete="off"
          required
          fullWidth
          helperText={helperText}
          label={label}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        ></TextField>
      </FormControl>
    </>
  );
}
